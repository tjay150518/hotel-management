import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PropertyService } from './property.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class WordToPdfService {

  private baseUrl = environment.apiURL;

  token = sessionStorage.getItem('token');
  headers = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };

  private readonly _status$ = new BehaviorSubject<"show" | "hide">("hide");
  readonly status$ = this._status$.asObservable();

  constructor(private http: HttpClient, private propertyService: PropertyService, private loaderService: LoaderService) { }

  show() {
    this._status$.next("show");
  }

  hide() {
    this._status$.next("hide");
  }

  async fetchAndProcessWordFile(docxUrl: string, data: any, ordertype: any, id: any): Promise<any> {
    this.loaderService.startLoader();
    try {
      // debugger
      const response = await this.http.get(docxUrl, { responseType: 'arraybuffer' }).toPromise();
      if (!response) {
        throw new Error('No response received from the server.');
      }

      const zip = new PizZip(response);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      // Set data for the template
      doc.setData(data);

      try {
        doc.render();
      } catch (error) {
        console.error('Error rendering document:', error);
        throw error;
      }

      const outputDoc = doc.getZip().generate({ type: 'arraybuffer' });

      const docxBlob = new Blob([outputDoc]);



      // Create formData object
      const formData = new FormData();
      formData.append('file', docxBlob, 'output.docx');
      // formData.append('fileName', ordertype);


      // Call fileUpload to upload the PDF
      this.convertToPdf(formData).subscribe((arraybuffer: ArrayBuffer) => {
        // Open the PDF
        if (ordertype == "Allotment Order") {
          this.openPDF(arraybuffer, id);

        }

        if (ordertype == 'Echallan') {
          this.openPDFEchallan(arraybuffer)
        }
      });

    } catch (error) {
      console.error('Error processing file:', error);
    }
  }

  async generateDocx(data: Array<any>, templateUrl: string, fileName: string): Promise<void> {
    // debugger
    try {
      // Fetch the template
      const response = await fetch(templateUrl);
      const templateBlob = await response.blob();

      // Read the Blob as binary data
      const reader = new FileReader();
      reader.readAsArrayBuffer(templateBlob);

      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result as ArrayBuffer;

          // Load the template into PizZip
          const zip = new PizZip(content);

          // Initialize Docxtemplater
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          // Set the data
          doc.setData({ data });

          // Render the document
          doc.render();

          // Generate the document as a Blob
          const outputBlob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });

          // Save the file
          saveAs(outputBlob, fileName);
        }
      };
    } catch (error) {
      console.error('Error generating document:', error);
    }
  }

  async generateMultiPageDocx(docxUrl: string, data: any[], ordertype: string) {
    // debugger
    this.loaderService.startLoader();

    try {
      const response = await this.http.get(docxUrl, { responseType: 'arraybuffer' }).toPromise();
      if (!response) {
        throw new Error('No response received from the server.');
      }

      const zip = new PizZip(response);

      // Iterate over data and generate content
      const multiPageContent: any = [];
      // data.forEach((entry) => {
      //   doc.setData(entry); // Populate template with individual data
      //   try {
      //     doc.render();
      //     const singlePageContent = doc.getZip().generate({ type: 'arraybuffer' });
      //     multiPageContent.push(new Blob([singlePageContent]));
      //   } catch (error) {
      //     console.error('Error rendering individual document:', error);
      //     throw error;
      //   }
      // });

      data.forEach((entry) => {
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        doc.setData(entry); // Populate template with individual data
        try {
          doc.render();

          const singlePageContent = doc.getZip().generate({ type: 'arraybuffer' });
          multiPageContent.push(new Blob([singlePageContent]));
        } catch (error) {
          console.error('Error rendering individual document:', error);
          throw error;
        }
      });
      // const pages = data.map((item: any) => ({
      //   address: item.address,
      //   gst: item.gst,
      //   pageBreak: '\f', // This is the page break marker
      // }));



      // Combine blobs with page breaks
      const combinedDoc = new Blob(multiPageContent, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const blobUrl = window.URL.createObjectURL(combinedDoc);

      // Create a link element
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'test.docx';

      // Trigger the download
      a.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
      // Create formData object for upload


    } catch (error) {
      console.error('Error processing multi-page document:', error);
    }
  }

  async generateDocument(data: any, templatePath: any): Promise<void> {
    try {
      // Load the template file as binary
      // const templatePath = '/assets/Invoice_dtp.docx';
      const response = await fetch(templatePath);
      const templateContent = await response.arrayBuffer();

      // Initialize PizZip and Docxtemplater
      const zip = new PizZip(templateContent);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Render the document with provided data
      doc.render({ data });

      // Generate the final document as a Blob
      const output = doc.getZip().generate({ type: 'blob' });
      // fs.saveAs(output, 'output.docx');

      const blobUrl = window.URL.createObjectURL(output);

      // Create a link element
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'test.docx';

      // Trigger the download
      a.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  }


  convertToPdf(formData: FormData): Observable<any> {
    const options = {
      headers: this.headers.headers,
      responseType: 'arraybuffer' as 'json' // Set the response type to arraybuffer
    };
    return this.http.post(`${this.baseUrl}/api/fileUpload/convert`, formData, options);
  }


  openPDF(arraybuffer: ArrayBuffer, id: any) {
    const blob = new Blob([arraybuffer], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);
    console.log('url', url);
    const formData = new FormData();
    formData.append('file', blob, 'sample.pdf');
    this.uploadPdfAllotmentorder(formData).subscribe((res: any) => {
      if (res) {
        let updateAlloment = {
          "id": id,
          "sighnedAllotmentOrderPath": res.body.responseObject,
          "description": "Allotment Order",
          "lcsStatus": "Ready"
        }
        this.propertyService.updateAllotmentOrder(updateAlloment).subscribe(updateAllotmentOrder => {
          if (updateAllotmentOrder) {

          }

        })
      }
    })
    // Open the PDF in a new tab
    this.loaderService.stopLoader();
    this.hide();

    window.open(url);

  }
  openPDFEchallan(arraybuffer: ArrayBuffer) {
    const blob = new Blob([arraybuffer], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);
    console.log('url', url);
    const formData = new FormData();
    formData.append('file', blob, 'sample.pdf');

    // Open the PDF in a new tab
    window.open(url);
  }


  uploadPdfAllotmentorder(formData: any) {

    return this.http.post(`${this.baseUrl}/api/fileUpload/uploadSighnedAlotmentOrder`, formData, this.headers);

  }
}
