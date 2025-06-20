import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-working-list-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './working-list-edit.component.html',
  styleUrl: './working-list-edit.component.scss',
})
export class WorkingListEditComponent {
  showFields = true;
  materialsForm!: FormGroup;
  data: any;
  typeOfWorkValue: string = '';
  isViewMode: boolean = false;

  addedMaterials: { materialName: string; quantity: number }[] = [];
  trackedMaterials: { materialName: string; quantity: number }[] = []; // Array to track materials, always includes all names
  visibleMaterials: {
    disabled: boolean;
    materialName: string;
    quantity: number;
  }[] = [];
  paramsValue: any;
  id: any;
  mode: any;
  townpanchayat: any;
  dropdownValues: string[] = []; // Store dropdown values
  isEO: any;
  isPL_SL_WS: any;
  role: any;
  directorate: any;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private http: SalesService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  isEOUser(): boolean {
    const zone = sessionStorage.getItem('townpanchayat');
    return zone ? zone.startsWith('EO') : false;
  }
  isADUser(): boolean {
    const zone = sessionStorage.getItem('zone');
    return zone ? zone.startsWith('AD_') : false;
  }

  ngOnInit(): void {
    this.townpanchayat = sessionStorage.getItem('townpanchayat');
    this.isEO = this.townpanchayat.startsWith('EO');
    this.directorate = sessionStorage.getItem('Directorate');
    // Check if townpanchayat starts with "PL", "SL", or "WS"
    this.isPL_SL_WS = /^(PH|SL|WS)/.test(this.townpanchayat);

    this.role = sessionStorage.getItem('role');

    this.route.params.subscribe((params: any) => {
      console.log(params, 'params');
      this.id = params.id;
      this.mode = params.type;
      console.log('mode', this.id, this.mode);
    });

    this.materialsForm = this.fb.group({
      nameOfWork: ['', Validators.required],
      typeOfWork: [0, Validators.required],
      categoryOfWork: ['', Validators.required],
      requirementFrom: ['', Validators.required],
      wardNo: ['', Validators.required],
      streetName: ['', Validators.required],
      workEssentialAmount: ['', Validators.required],
      assetName: ['', Validators.required],
      handOverDate: ['', Validators.required],
      jvNo: ['', Validators.required],

      councilSubjectNo: ['', Validators.required],
      resolutionNo: ['', Validators.required],
      resolutionDate: ['', Validators.required],

      // Tender Details Fields
      tenderId: ['', Validators.required],
      tenderDate: ['', Validators.required],
      awardedContractorName: ['', Validators.required],
      contractValue: ['', Validators.required],
      workOrderNo: ['', Validators.required],
      woDate: ['', Validators.required],
      agreementNo: ['', Validators.required],
      agreementDate: ['', Validators.required],

      materialsSupplyByContractor: this.fb.array([
        this.createMaterialSupplyRow(),
      ]),
      materialsIssuedToIncharges: this.fb.array([
        this.createIssuedMaterialRow(),
      ]),
    });

    if (this.isEOUser()) {
      this.getDataById();
      this.getDropdownvalue();
    } else if (this.isADUser()) {
      this.getDataById_zone();
    } else {
      this.getDataById_directorate();
    }

    // Disable entire form including form arrays if mode is 'view'
    if (this.mode === 'view') {
      this.disableForm();
    }
  }

  // ✅ Corrected method to disable form arrays
  disableForm() {
    this.materialsForm.disable(); // Disable the main form

    // Disable each FormArray properly
    this.disableFormArray(
      this.materialsForm.get('materialsSupplyByContractor') as FormArray
    );
    this.disableFormArray(
      this.materialsForm.get('materialsIssuedToIncharges') as FormArray
    );
  }

  // ✅ Utility function to disable all form groups inside a FormArray
  disableFormArray(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        control.disable(); // Disable each FormGroup inside the FormArray
      }
    });
  }

  get materialsSupplyByContractor(): FormArray {
    return this.materialsForm.get('materialsSupplyByContractor') as FormArray;
  }

  get materialsIssuedToIncharges(): FormArray {
    return this.materialsForm.get('materialsIssuedToIncharges') as FormArray;
  }

  createMaterialSupplyRow(): FormGroup {
    return this.fb.group({
      materialName: ['', Validators.required],
      unitSize: ['', Validators.required],
      ratePerUnit: [0, Validators.required],
      quantity: [0, Validators.required],
      deliveryChallanNo: ['', Validators.required],
      challanDate: ['', Validators.required],
      totalQuality: ['', Validators.required],
    });
  }

  createIssuedMaterialRow(): FormGroup {
    return this.fb.group({
      materialName: ['', Validators.required],
      quantity: [0, Validators.required],
      issuedQuantity: [0, Validators.required],
      inchargePerson: ['', Validators.required],
      issuedDate: ['', Validators.required],
      balanceQuantity: [{ value: 0, disabled: true }, Validators.required],
      fileUpload: [],
    });
  }

  addMaterial(): void {
    this.materialsSupplyByContractor.push(this.createMaterialSupplyRow());
  }

  removeMaterial(index: number): void {
    const removedMaterial = this.materialsSupplyByContractor
      .at(index)
      .get('materialName')?.value;
    const materialId = this.materialsSupplyByContractor
      .at(index)
      .get('id')?.value; // Assuming ID exists

    if (!materialId) {
      this.materialsSupplyByContractor.removeAt(index);
      return;
    }

    // Call API to delete material
    this.http.deleteMaterialfromSupply(materialId).subscribe({
      next: () => {
        this.materialsSupplyByContractor.removeAt(index);
        this.captureValue(); // Update values after deletion
      },
      error: (err) => {
        console.error('Error deleting material:', err);
      },
    });
  }

  addIssuedMaterial(): void {
    this.materialsIssuedToIncharges.push(this.createIssuedMaterialRow());
    this.captureValue();
  }

  removeIssuedMaterial(index: number): void {
    this.materialsIssuedToIncharges.removeAt(index);
    this.captureValue();
  }

  // captureValue(): void {
  //   console.log("enter into submit")
  //   this.materialsSupplyByContractor.controls.forEach(control => {
  //     const materialName = control.get('materialName')?.value;
  //     const quantity = control.get('quantity')?.value;
  //     console.log("data from submit",materialName,quantity)

  //     if (materialName && quantity) {
  //       const existingMaterial = this.addedMaterials.find(mat => mat.materialName === materialName);
  //       console.log("existingMaterial",existingMaterial)

  //       if (!existingMaterial) {

  //         this.addedMaterials.push({ materialName, quantity });
  //       }

  //       const trackedMaterial = this.trackedMaterials.find(mat => mat.materialName === materialName);
  //       console.log("trackedMaterial",trackedMaterial)

  //       if (!trackedMaterial) {

  //         this.trackedMaterials.push({ materialName, quantity });
  //       }
  //     }
  //   });
  // }
  captureValue(): void {
    console.log('enter into submit');
    this.materialsSupplyByContractor.controls.forEach((control) => {
      const materialName = control.get('materialName')?.value;
      const quantity = control.get('quantity')?.value;
      console.log('data from submit', materialName, quantity);

      if (materialName && quantity !== null) {
        const existingMaterial = this.addedMaterials.find(
          (mat) => mat.materialName === materialName
        );
        console.log('existingMaterial', existingMaterial);

        if (!existingMaterial) {
          this.addedMaterials.push({ materialName, quantity });
        } else {
          // Update quantity if already exists
          existingMaterial.quantity = quantity;
        }

        const trackedMaterial = this.trackedMaterials.find(
          (mat) => mat.materialName === materialName
        );
        console.log('trackedMaterial', trackedMaterial);

        if (!trackedMaterial) {
          this.trackedMaterials.push({ materialName, quantity });
        } else {
          // Update quantity if already exists
          trackedMaterial.quantity = quantity;
        }
      }
    });
  }

  onMaterialChange(index: number): void {
    const issuedMaterial = this.materialsIssuedToIncharges.at(index);
    const materialName = issuedMaterial.get('materialName')?.value;

    // Find the latest balance from previously issued entries
    let latestBalance = null;
    for (let i = 0; i < index; i++) {
      const prevMaterial = this.materialsIssuedToIncharges.at(i);
      if (prevMaterial.get('materialName')?.value === materialName) {
        latestBalance = prevMaterial.get('balanceQuantity')?.value;
        console.log('latestBalance', latestBalance);
      }
    }

    // Get the tracked material from the stored list
    const selectedMaterial = this.trackedMaterials.find(
      (mat) => mat.materialName === materialName
    );
    console.log('selectedMaterial', selectedMaterial);

    if (selectedMaterial) {
      console.log('selectedMaterial', selectedMaterial);

      issuedMaterial.patchValue({
        quantity:
          latestBalance !== null ? latestBalance : selectedMaterial.quantity, // Use previous balance if available
        balanceQuantity:
          latestBalance !== null ? latestBalance : selectedMaterial.quantity,
      });
    } else {
      issuedMaterial.patchValue({ quantity: 0, balanceQuantity: 0 });
    }

    this.updateDropdownVisibility();
  }

  onIssuedQuantityChange(index: number): void {
    const issuedMaterial = this.materialsIssuedToIncharges.at(index);
    const issuedQuantity = issuedMaterial.get('issuedQuantity')?.value;
    const inHandQuantity = issuedMaterial.get('quantity')?.value;

    if (
      typeof issuedQuantity !== 'number' ||
      typeof inHandQuantity !== 'number'
    ) {
      return; // Ensure both quantities are numbers
    }

    if (issuedQuantity > inHandQuantity) {
      issuedMaterial.get('issuedQuantity')?.setErrors({
        maxExceeded: `Issued quantity cannot exceed in-hand quantity (${inHandQuantity}).`,
      });
      return;
    } else {
      issuedMaterial.get('issuedQuantity')?.setErrors(null);
    }

    const balance = inHandQuantity - issuedQuantity;
    issuedMaterial.patchValue({ balanceQuantity: balance });

    const materialName = issuedMaterial.get('materialName')?.value;
    if (materialName) {
      const trackedMaterial = this.trackedMaterials.find(
        (mat) => mat.materialName === materialName
      );
      if (trackedMaterial) {
        trackedMaterial.quantity = balance;
      }
    }

    for (let i = index + 1; i < this.materialsIssuedToIncharges.length; i++) {
      const nextMaterial = this.materialsIssuedToIncharges.at(i);
      if (nextMaterial.get('materialName')?.value === materialName) {
        nextMaterial.patchValue({
          inHandQuantity: balance, // Set the in-hand quantity for the next row
        });
      }
    }

    // Disable materials with zero balance in the dropdown
    this.updateDropdownVisibility();
  }

  updateDropdownVisibility(): void {
    // Map addedMaterials and determine if they should be disabled
    this.visibleMaterials = this.addedMaterials.map((mat) => {
      const trackedMaterial = this.trackedMaterials.find(
        (t) => t.materialName === mat.materialName
      );
      const quantity = trackedMaterial
        ? trackedMaterial.quantity
        : mat.quantity;
      return {
        ...mat,
        disabled: quantity === 0,
      };
    });
  }
  isMaterialDisabled(materialName: any): boolean {
    const material = this.visibleMaterials.find(
      (mat: any) => mat.materialName === materialName
    );
    return material ? material.disabled : false;
  }
  isMaterialUsed(materialName: string): boolean {
    return this.materialsIssuedToIncharges.controls.some(
      (control) => control.get('materialName')?.value === materialName
    );
  }

  // Filter available materials for the dropdown
  getAvailableMaterials(): any[] {
    return this.addedMaterials.filter((material) => material.quantity > 0);
  }
  onTypeOfWorkChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('selceted', selectedValue);
    this.showFields = selectedValue !== 'maintenance';
  }
  getDropdownvalue() {
    this.http
      .getDropdown('/api/getUlbDetails', this.townpanchayat)
      .subscribe((data: any) => {
        console.log('data', data);

        // Extract values from API response
        if (data) {
          this.dropdownValues = [
            data.publicHealth,
            data.waterSupply,
            data.streetLight,
          ];
        }
      });
  }

  onSubmit() {
    const formValue = this.materialsForm.value;

    const formatDate = (date: string | Date) =>
      date ? this.datePipe.transform(date, 'dd-MM-yyyy') : null;

    const payload = {
      id: this.id,
      nameOfWork: formValue.nameOfWork,
      typeOfWork: formValue.typeOfWork,
      categoryOfWork: formValue.categoryOfWork,
      requirementFrom: formValue.requirementFrom,
      wardNo: formValue.wardNo,
      streetName: formValue.streetName,
      workEssentialAmount: formValue.workEssentialAmount,
      assetName: formValue.assetName,
      jvNo: formValue.jvNo,
      handOverDate: formatDate(formValue.handOverDate),
      councilSubjectNo: formValue.councilSubjectNo,
      resolutionNo: formValue.resolutionNo,
      resolutionDate: formatDate(formValue.resolutionDate),
      tenderId: formValue.tenderId,
      tenderDate: formatDate(formValue.tenderDate),
      awardedContractorName: formValue.awardedContractorName,
      contractValue: formValue.contractValue,
      workOrderNo: formValue.workOrderNo,
      woDate: formatDate(formValue.woDate),
      agreementNo: formValue.agreementNo,
      agreementDate: formatDate(formValue.agreementDate),

      materialIssuedList: this.materialsForm
        .get('materialsIssuedToIncharges')
        ?.getRawValue()
        .map((item: any) => ({
          id: item.id ? item.id : null,
          materialName: item.materialName,
          quantity: item.quantity,
          issuedQuantity: item.issuedQuantity,
          inchargePerson: item.inchargePerson,
          issuedDate: formatDate(item.issuedDate),
          balanceQuantity: item.balanceQuantity,
          fileUpload: item.fileUpload,
        })),

      materialSupplyList: formValue.materialsSupplyByContractor.map(
        (item: any) => ({
          id: item.id ? item.id : null,
          materialName: item.materialName,
          unitSize: item.unitSize,
          ratePerUnit: item.ratePerUnit,
          quantity: item.quantity,
          deliveryChallanNo: item.deliveryChallanNo,
          challanDate: formatDate(item.challanDate),
          totalQuality: item.totalQuality,
        })
      ),
    };

    console.log('Updated Payload:', payload);

    this.http
      .updateBy_EO('/api/work/update', this.townpanchayat, this.id, payload)
      .subscribe((response) => {
        console.log('Response:', response);
        if (response) {
          this.router.navigate(['/Hotel/invoice_edit']);
        }
      });
  }

  getDataById() {
    this.http
      .getDtaById('/api/work/getById', this.townpanchayat, this.id)
      .subscribe((response: any) => {
        if (response.responseStatus && response.responseObject) {
          const workData = response.responseObject;
          this.typeOfWorkValue = workData.typeOfWork;

          this.materialsForm.patchValue({
            nameOfWork: workData.nameOfWork,
            typeOfWork: workData.typeOfWork,
            categoryOfWork: workData.categoryOfWork,
            requirementFrom: workData.requirementFrom,
            wardNo: workData.wardNo,
            streetName: workData.streetName,
            workEssentialAmount: workData.workEssentialAmount,
            assetName: workData.assetName,
            handOverDate: this.convertToDateFormat(workData.handOverDate),
            jvNo: workData.jvNo,
            councilSubjectNo: workData.councilSubjectNo,
            resolutionNo: workData.resolutionNo,
            resolutionDate: this.convertToDateFormat(workData.resolutionDate),
            tenderId: workData.tenderId,
            tenderDate: this.convertToDateFormat(workData.tenderDate),
            awardedContractorName: workData.awardedContractorName,
            contractValue: workData.contractValue,
            workOrderNo: workData.workOrderNo,
            woDate: this.convertToDateFormat(workData.woDate),
            agreementNo: workData.agreementNo,
            agreementDate: this.convertToDateFormat(workData.agreementDate),
          });

          // if (workData.materialSupplyList?.length) {
          //   const materialsSupplyArray = this.materialsForm.get('materialsSupplyByContractor') as FormArray;
          //   materialsSupplyArray.clear();
          //   workData.materialSupplyList.forEach((material: any) => {
          //     let fileName = material.fileUpload ? material.fileUpload.split('\\').pop() : '';

          //     materialsSupplyArray.push(this.fb.group({
          //       id: [material.id],

          //       materialName: [material.materialName],
          //       unitSize: [material.unitSize],
          //       ratePerUnit: [material.ratePerUnit],
          //       quantity: [material.quantity],
          //       deliveryChallanNo: [material.deliveryChallanNo],
          //       challanDate: [this.convertToDateFormat(material.challanDate)],
          //       totalQuality: [material.totalQuality],
          //       fileUpload: [fileName],
          //      disabled: this.mode === 'view'

          //     }));
          //   });
          //             if (this.mode === 'view') {
          //   this.materialsForm.disable();
          //   this.isViewMode = true;
          // } else {
          //   this.materialsForm.enable();
          // }

          // }

          if (workData.materialSupplyList?.length) {
            const materialsSupplyArray = this.materialsForm.get(
              'materialsSupplyByContractor'
            ) as FormArray;
            materialsSupplyArray.clear();

            workData.materialSupplyList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : '';

              const materialGroup = this.fb.group({
                id: [material.id],
                materialName: [
                  { value: material.materialName, disabled: true },
                ],
                unitSize: [{ value: material.unitSize, disabled: true }],
                ratePerUnit: [{ value: material.ratePerUnit, disabled: true }],
                quantity: [{ value: material.quantity, disabled: true }],
                deliveryChallanNo: [
                  { value: material.deliveryChallanNo, disabled: true },
                ],
                challanDate: [
                  {
                    value: this.convertToDateFormat(material.challanDate),
                    disabled: true,
                  },
                ],
                totalQuality: [
                  { value: material.totalQuality, disabled: true },
                ],
                fileUpload: [{ value: fileName, disabled: true }],
              });

              materialsSupplyArray.push(materialGroup);
            });

            this.isViewMode = true;
          }

          // if (workData.materialIssuedList?.length) {
          //   const materialsIssuedArray = this.materialsForm.get('materialsIssuedToIncharges') as FormArray;
          //   materialsIssuedArray.clear();
          //   workData.materialIssuedList.forEach((material: any) => {
          //     materialsIssuedArray.push(this.fb.group({
          //       id: [material.id],

          //       materialName: [material.materialName],
          //       quantity: [material.quantity],
          //       issuedQuantity: [material.issuedQuantity],
          //       inchargePerson: [material.inchargePerson],
          //       issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
          //       balanceQuantity: [{ value: material.balanceQuantity, disabled: true }],
          //       fileUpload: [material.fileUpload]
          //     }));
          //   });
          // }

          if (workData.materialIssuedList?.length) {
            const materialsIssuedArray = this.materialsForm.get(
              'materialsIssuedToIncharges'
            ) as FormArray;
            materialsIssuedArray.clear();
            workData.materialIssuedList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : ''; // Extract file name

              console.log(fileName, 'fileName');

              materialsIssuedArray.push(
                this.fb.group({
                  id: [material.id],
                  materialName: [material.materialName],
                  quantity: [material.quantity],
                  issuedQuantity: [material.issuedQuantity],
                  inchargePerson: [material.inchargePerson],
                  issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
                  balanceQuantity: [
                    { value: material.balanceQuantity, disabled: true },
                  ],
                  fileUpload: [material.fileUpload], // ✅ Store only file name
                })
              );
            });
          }

          console.log('Form patched successfully:', this.materialsForm.value);

          // this.addedMaterials = response.responseObject.materialSupplyList.map((x:any)=>x.materialName);
          this.captureValue();
        }
      });
  }

  convertToDateFormat(dateString: string | null): string | null {
    if (!dateString) return null;
    let parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert to 'YYYY-MM-DD'
    }
    return null;
  }
  fileError: boolean = false;

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    console.log('fileeee', file);

    if (file) {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 200) {
        this.fileError = true;
        event.target.value = ''; // Reset file input
      } else {
        this.fileError = false;

        const formData = new FormData();
        formData.append('file', file);

        this.http.apiPostCall_upload(formData, '/api/files/upload').subscribe(
          (response: any) => {
            console.log('Full API Response:', response); // Debugging
            console.log('Full API Response Type:', typeof response);

            let jsonResponse;
            try {
              jsonResponse =
                typeof response === 'string' ? JSON.parse(response) : response;
            } catch (error) {
              console.error('JSON Parsing Error:', error);
              jsonResponse = {};
            }

            const uploadedFilePath = jsonResponse?.file || null;

            console.log('Extracted File Path:', uploadedFilePath);

            const materialsIssuedToIncharges = this.materialsForm.get(
              'materialsIssuedToIncharges'
            ) as FormArray;

            console.log(
              '🔹 Before Patching:',
              materialsIssuedToIncharges.at(index).value
            );

            materialsIssuedToIncharges.at(index).patchValue({
              fileUpload: uploadedFilePath,
            });

            console.log(
              '✅ After Patching:',
              materialsIssuedToIncharges.at(index).value
            );
            console.log('Updated FormArray:', this.materialsForm.value);
          },
          (error) => {
            console.error('File upload failed', error);
          }
        );
      }
    }
  }
  viewFile(index: number) {
    let filePath =
      this.materialsIssuedToIncharges.controls[index].get('fileUpload')?.value;

    if (filePath) {
      window.open(filePath, '_blank'); // Opens the uploaded file in a new tab
    } else {
      alert('No file available to view.');
    }
  }

  downloadFile(index: number) {
    let filePath =
      this.materialsIssuedToIncharges.controls[index].get('fileUpload')?.value;

    if (filePath) {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = filePath.split('/').pop() || 'downloaded_file'; // Extracts filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No file available to download.');
    }
  }
  getDataById_zone() {
    console.log('data from the zone ');
    this.http
      .getDtaById_zone_directorate('/api/ad/getById', this.id)
      .subscribe((response: any) => {
        if (response.responseStatus && response.responseObject) {
          const workData = response.responseObject;
          this.typeOfWorkValue = workData.typeOfWork;

          this.materialsForm.patchValue({
            nameOfWork: workData.nameOfWork,
            typeOfWork: workData.typeOfWork,
            categoryOfWork: workData.categoryOfWork,
            requirementFrom: workData.requirementFrom,
            wardNo: workData.wardNo,
            streetName: workData.streetName,
            workEssentialAmount: workData.workEssentialAmount,
            assetName: workData.assetName,
            handOverDate: this.convertToDateFormat(workData.handOverDate),
            jvNo: workData.jvNo,
            councilSubjectNo: workData.councilSubjectNo,
            resolutionNo: workData.resolutionNo,
            resolutionDate: this.convertToDateFormat(workData.resolutionDate),
            tenderId: workData.tenderId,
            tenderDate: this.convertToDateFormat(workData.tenderDate),
            awardedContractorName: workData.awardedContractorName,
            contractValue: workData.contractValue,
            workOrderNo: workData.workOrderNo,
            woDate: this.convertToDateFormat(workData.woDate),
            agreementNo: workData.agreementNo,
            agreementDate: this.convertToDateFormat(workData.agreementDate),
          });

          if (workData.materialSupplyList?.length) {
            const materialsSupplyArray = this.materialsForm.get(
              'materialsSupplyByContractor'
            ) as FormArray;
            materialsSupplyArray.clear();
            workData.materialSupplyList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : '';

              materialsSupplyArray.push(
                this.fb.group({
                  id: [material.id],

                  materialName: [material.materialName],
                  unitSize: [material.unitSize],
                  ratePerUnit: [material.ratePerUnit],
                  quantity: [material.quantity],
                  deliveryChallanNo: [material.deliveryChallanNo],
                  challanDate: [this.convertToDateFormat(material.challanDate)],
                  totalQuality: [material.totalQuality],
                  fileUpload: [fileName],
                })
              );
            });
          }

          // if (workData.materialIssuedList?.length) {
          //   const materialsIssuedArray = this.materialsForm.get('materialsIssuedToIncharges') as FormArray;
          //   materialsIssuedArray.clear();
          //   workData.materialIssuedList.forEach((material: any) => {
          //     materialsIssuedArray.push(this.fb.group({
          //       id: [material.id],

          //       materialName: [material.materialName],
          //       quantity: [material.quantity],
          //       issuedQuantity: [material.issuedQuantity],
          //       inchargePerson: [material.inchargePerson],
          //       issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
          //       balanceQuantity: [{ value: material.balanceQuantity, disabled: true }],
          //       fileUpload: [material.fileUpload]
          //     }));
          //   });
          // }

          if (workData.materialIssuedList?.length) {
            const materialsIssuedArray = this.materialsForm.get(
              'materialsIssuedToIncharges'
            ) as FormArray;
            materialsIssuedArray.clear();
            workData.materialIssuedList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : ''; // Extract file name

              console.log(fileName, 'fileName');

              materialsIssuedArray.push(
                this.fb.group({
                  id: [material.id],
                  materialName: [material.materialName],
                  quantity: [material.quantity],
                  issuedQuantity: [material.issuedQuantity],
                  inchargePerson: [material.inchargePerson],
                  issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
                  balanceQuantity: [
                    { value: material.balanceQuantity, disabled: true },
                  ],
                  fileUpload: [material.fileUpload], // ✅ Store only file name
                })
              );
            });
          }

          console.log('Form patched successfully:', this.materialsForm.value);

          // this.addedMaterials = response.responseObject.materialSupplyList.map((x:any)=>x.materialName);
          this.captureValue();
        }
      });
  }
  getDataById_directorate() {
    console.log('enter in to the directorate');
    this.http
      .getDtaById_zone_directorate('/api/directorate/getById', this.id)
      .subscribe((response: any) => {
        if (response.responseStatus && response.responseObject) {
          const workData = response.responseObject;
          this.typeOfWorkValue = workData.typeOfWork;

          this.materialsForm.patchValue({
            nameOfWork: workData.nameOfWork,
            typeOfWork: workData.typeOfWork,
            categoryOfWork: workData.categoryOfWork,
            requirementFrom: workData.requirementFrom,
            wardNo: workData.wardNo,
            streetName: workData.streetName,
            workEssentialAmount: workData.workEssentialAmount,
            assetName: workData.assetName,
            handOverDate: this.convertToDateFormat(workData.handOverDate),
            jvNo: workData.jvNo,
            councilSubjectNo: workData.councilSubjectNo,
            resolutionNo: workData.resolutionNo,
            resolutionDate: this.convertToDateFormat(workData.resolutionDate),
            tenderId: workData.tenderId,
            tenderDate: this.convertToDateFormat(workData.tenderDate),
            awardedContractorName: workData.awardedContractorName,
            contractValue: workData.contractValue,
            workOrderNo: workData.workOrderNo,
            woDate: this.convertToDateFormat(workData.woDate),
            agreementNo: workData.agreementNo,
            agreementDate: this.convertToDateFormat(workData.agreementDate),
          });

          if (workData.materialSupplyList?.length) {
            const materialsSupplyArray = this.materialsForm.get(
              'materialsSupplyByContractor'
            ) as FormArray;
            materialsSupplyArray.clear();
            workData.materialSupplyList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : '';

              materialsSupplyArray.push(
                this.fb.group({
                  id: [material.id],

                  materialName: [material.materialName],
                  unitSize: [material.unitSize],
                  ratePerUnit: [material.ratePerUnit],
                  quantity: [material.quantity],
                  deliveryChallanNo: [material.deliveryChallanNo],
                  challanDate: [this.convertToDateFormat(material.challanDate)],
                  totalQuality: [material.totalQuality],
                  fileUpload: [fileName],
                })
              );
            });
          }

          // if (workData.materialIssuedList?.length) {
          //   const materialsIssuedArray = this.materialsForm.get('materialsIssuedToIncharges') as FormArray;
          //   materialsIssuedArray.clear();
          //   workData.materialIssuedList.forEach((material: any) => {
          //     materialsIssuedArray.push(this.fb.group({
          //       id: [material.id],

          //       materialName: [material.materialName],
          //       quantity: [material.quantity],
          //       issuedQuantity: [material.issuedQuantity],
          //       inchargePerson: [material.inchargePerson],
          //       issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
          //       balanceQuantity: [{ value: material.balanceQuantity, disabled: true }],
          //       fileUpload: [material.fileUpload]
          //     }));
          //   });
          // }

          if (workData.materialIssuedList?.length) {
            const materialsIssuedArray = this.materialsForm.get(
              'materialsIssuedToIncharges'
            ) as FormArray;
            materialsIssuedArray.clear();
            workData.materialIssuedList.forEach((material: any) => {
              let fileName = material.fileUpload
                ? material.fileUpload.split('\\').pop()
                : ''; // Extract file name

              console.log(fileName, 'fileName');

              materialsIssuedArray.push(
                this.fb.group({
                  id: [material.id],
                  materialName: [material.materialName],
                  quantity: [material.quantity],
                  issuedQuantity: [material.issuedQuantity],
                  inchargePerson: [material.inchargePerson],
                  issuedDate: [this.convertToDateFormat(material.issuedDate)], // ✅ Convert date
                  balanceQuantity: [
                    { value: material.balanceQuantity, disabled: true },
                  ],
                  fileUpload: [material.fileUpload], // ✅ Store only file name
                })
              );
            });
          }

          console.log('Form patched successfully:', this.materialsForm.value);

          // this.addedMaterials = response.responseObject.materialSupplyList.map((x:any)=>x.materialName);
          this.captureValue();
        }
      });
  }
}
