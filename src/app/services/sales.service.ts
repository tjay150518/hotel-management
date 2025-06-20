import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl = environment.apiURL;

  token = sessionStorage.getItem('token');
  headers = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllSchemes(): Observable<any> {
    const encodedStatus = encodeURIComponent("Yes");
    // return this.httpClient.get(`${this.baseUrl}/api/getSchemeDataByPublishedStatus?publishedStatus=${encodedStatus}`, this.headers);

    return this.httpClient.get(`${this.baseUrl}/api/getSchemeDataByPublishedStatus?publishedStatus=${encodedStatus}`, {});

  }

  apiPostCall_upload(postParam: FormData, endPoint: string) {
    let token = sessionStorage.getItem('token'); // Retrieve the token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let finalURL = this.baseUrl + endPoint;

    return this.httpClient.post(finalURL, postParam, { headers, responseType: 'text' });
  }

  apiPostCall2(postParam: any, endPoint: string, townPanchayat: string) {
    let token = sessionStorage.getItem('token');  // Retrieve the token from session storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Optional: Add more headers as needed
    });
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.post(finalURL, postParam, { params, headers });
  }

  getAllSchemesByUnitType(type: any): Observable<any> {
    const encodedType = encodeURIComponent(type);
    const encodedStatus = encodeURIComponent("Yes");
    return this.httpClient.get(`${this.baseUrl}/api/getSchemeDataByPublishedStatusAndUnitType?publishedStatus=${encodedStatus}&unitType=${encodedType}`, this.headers);
  }

  //Card View
  getAllSchemesCardView(): Observable<any> {
    const encodedStatus = encodeURIComponent("Yes");
    // return this.httpClient.get(`${this.baseUrl}/api/websiteData/getWebsiteDataBySchemeDataPubishedStatus?publishedStatus=${encodedStatus}`, this.headers);

    return this.httpClient.get(`${this.baseUrl}/api/websiteData/getWebsiteDataBySchemeDataPubishedStatus?publishedStatus=${encodedStatus}`, {});

  }

  getSchemeDataById(schemeId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/schemedata/getById/${schemeId}`, this.headers);
  }

  //Scheme Counts
  getCountsBySchemeId(schemeId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/unitdata/counts/${schemeId}`, this.headers);
  }

  getUnitDataBySchemeId(schemeId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/unitdata/getBySchemeId/${schemeId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        // 'Content-Type': 'text/plain'


      })
    });
  }

  //get unit data by unit id
  getUnitById(unitId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/unitdata/getById/${unitId}`, this.headers);
  }

  getWebsiteDataBySchemeId(schemeId: any): Observable<any> {
    // return this.httpClient.get(`${this.baseUrl}/api/websiteData/getBySchemeId/${schemeId}`, this.headers);
    return this.httpClient.get(`${this.baseUrl}/api/websiteData/getBySchemeId/${schemeId}`, {});

  }

  getIconsById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/attachment/getById/${id}`, this.headers);
  }

  //Enquiry Form
  sendEnquiry(data: any): Observable<any> {
    // return this.httpClient.post(`${this.baseUrl}/api/enquiry/create`, data, this.headers);
    return this.httpClient.post(`${this.baseUrl}/api/enquiry/create`, data, {});

  }

  //application form
  createCustomerApplication(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/application/create`, data, this.headers);
  }

  getAllApplicationByCustomerId(customerId: any, type: any): Observable<any> {
    // debugger
    // return this.httpClient.get(`${this.baseUrl}/api/application/getAllByCustomerId/${customerId}`, this.headers);
    // return this.httpClient.get(`${this.baseUrl}/api/application/getByCustomerIdAndAllotedStatus?customerId=${customerId}&allotedStatus=Yes`, this.headers);
    return this.httpClient.get(`${this.baseUrl}/api/application/getByCustomerIdAndApplicationStatus?customerId=${customerId}&applicationStatus=${type}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        // 'Content-Type': 'text/plain'


      })
    });

  }

  getApplicationById(applicationId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/application/getById/${applicationId}`, this.headers);
  }

  getAllIncome(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/incomeLimit/getAll`, this.headers);
  }

  //File Upload
  fileUpload(file: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/fileUpload/upload`, file, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        // 'Content-Type': 'text/plain'


      })
    });
  }

  lcsRequestUpload(file: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/fileUpload/updateRequestLcs`, file, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        // 'Content-Type': 'text/plain'


      })
    });
  }

  updateLCSRequestStatus(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/application/updateRequestLcs`, data, this.headers);
  }

  updateHomeLoanStatus(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/application/updateHomeLoanStatus`, data, this.headers);
  }

  updateLoanSancStatus(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/application/updateLoansanction`, data, this.headers);
  }


  //Payments
  createTransaction(data: any): Observable<any> {
    // return this.httpClient.post(`${this.baseUrl}/api/payment/create`, data, this.headers);\
    return this.httpClient.post(`${this.baseUrl}/api/transaction/create`, data, this.headers);

  }

  createPayment(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/payments/create`, data, this.headers);

  }

  getAllPaymentsByApplicationId(UnitAccountNo: any): Observable<any> {
    // debugger
    // return this.httpClient.get(`${this.baseUrl}/api/payment/getByApplicationId/${applicationId}`, this.headers);
    // return this.httpClient.post(`${this.baseUrl}/api/transaction/getByUnitAccountNumber?unitAcccountNumber=${UnitAccountNo}`, this.headers);
    return this.httpClient.post(`${this.baseUrl}/api/payments/getByUnitAccountNumber?unitAcccountNumber=${UnitAccountNo}`, {}, this.headers);

  }

  getAllApplicationDetails(UnitAccountNo: any): Observable<any> {


    return this.httpClient.get(`${this.baseUrl}/api/application/getByUnitAccountNumber?unitAccountNumber=${UnitAccountNo}`, this.headers);
  }


  //Template 
  getAllTemplate(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/template/getAll`, this.headers);
  }

  //Customer 
  getCustomerById(id: any): Observable<any> {
    // return this.httpClient.post(`${this.baseUrl}/api/customer/getById/${id}`, this.headers);
    return this.httpClient.get(`${this.baseUrl}/api/user/getById/${id}`, this.headers);


  }

  //reservation page
  getReservationDataBySchemeId(schemeDataId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/reservation/getBySchemeId/${schemeDataId}`, this.headers);
  }

  //booking status
  getAllCarParkingBySchemeId(schemeDataId: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/application/getAllCarParking/${schemeDataId}`, this.headers);
  }


  createSchemeData(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/categoryReservation/create`, this.headers);
  }
  getAllSChemesData(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/categoryReservation/getAll`, this.headers);
  }




  UpdatedTimeByUnit(data: any): Observable<any> {

    return this.httpClient.post(`${this.baseUrl}/api/unitdata/updateTimeByUnit`, data, this.headers);
    // return this.httpClient.post(`${this.baseUrl}/api/unitdata/getAllTimeBySchemeId/${id}`, this.headers);

  }

  // getUpdatedTimeByUnit(id: number): Observable<any> {
  getUpdatedTimeByUnit(schemeId: any, dummyId: any): Observable<any> {

    return this.httpClient.post(`${this.baseUrl}/api/unitdata/getAllTimeBySchemeId/${schemeId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        // 'Content-Type': 'text/plain'


      })
    });
    // return this.httpClient.get(`${this.baseUrl}/api/unitdata/getBySchemeDummyId/${schemeId}?dId=${dummyId}`, this.headers);



  }
  //booking Save

  bookingSave(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/bookingPaymentDetails/create`, data, this.headers);
  }
  getBookingDetails(unitAccountNumber: any): Observable<any> {
    // return this.httpClient.get(`${this.baseUrl}/api/bookingPaymentDetails/getById/${bookingId}`, this.headers);

    return this.httpClient.post(`${this.baseUrl}/api/bookingPaymentDetails/getByUnitAccountNumber?unitAccountNumber=${unitAccountNumber}`, {}, this.headers);

  }


  getPaymentHistoryBySchemeCode(id: any): Observable<any> {
    // return this.httpClient.post(`${this.baseUrl}/api/payment/getBySchemeCode?schemeCode=${id}`, {}, this.headers);
    // return this.httpClient.post(`${this.baseUrl}/api/transaction/getBySchemeCode?schemeCode=${id}`, {}, this.headers);
    return this.httpClient.post(`${this.baseUrl}/api/payments/getBySchemeCode?schemeCode=${id}`, {}, this.headers);

  }


  deleteALLBookingDetailsList() {


    return this.httpClient.post(`${this.baseUrl}/api/bookingPaymentDetails/deleteAll`, {}, this.headers);

  }

  allotePermitStatusChange(applicationId: any) {
    // return this.httpClient.post(`${this.baseUrl}/api/application/${applicationId}/applicationPaymentStatus`, {}, this.headers);
    return this.httpClient.post(`${this.baseUrl}/api/application/updateApplicationPaymentStatus/${applicationId}`, {}, this.headers);

  }

  updateBookingStatus(data: any) {

    let token = sessionStorage.getItem('token');
    console.log('token', token);
    // debugger
    let headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };


    return this.httpClient.post(`${this.baseUrl}/api/unitdata/updateBookingStatus`, data, headers);

  }

  getUnitBySchemeId(schemeId: any, unitId: any) {

    return this.httpClient.post(`${this.baseUrl}/api/unitdata/getBySchemeinDummyId/${schemeId}?dId=${unitId}`, {}, this.headers);

  }
  searchForgotPassword(data: any) {

    return this.httpClient.post(`${this.baseUrl}/api/user/generateOtpForUser`, data, this.headers);

  }
  forgotPasswordVerify1(otp: any) {

    return this.httpClient.post(`${this.baseUrl}/api/user/getByVerifyOtp?verifyOtp=${otp}`, {}, this.headers);


  }

  forgotPasswordSendOtp2(username: any) {

    return this.httpClient.post(`${this.baseUrl}/api/user/auth/forgotPassword?username=${username}`, {}, this.headers);


  }
  changePasswordForgot(data: any) {
    return this.httpClient.post(`${this.baseUrl}/api/user/auth/resetPasswordToken`, data, this.headers);

  }





  dtpGetInvoiceData() {
    return this.httpClient.post(`${this.baseUrl}/api/invoice/getAll`, {});

  }

  getDtpDataById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/invoice/getById/${id}`, {});

  }


  createMember(payload: any) {
    return this.httpClient.post(`${this.baseUrl}/council-member/create`, payload);
  }

  updateMember(id: string, payload: any) {
    return this.httpClient.put(`${this.baseUrl}/council-member/${id}`, payload);
  }

  getAllMemberDetails() {
    return this.httpClient.get(`${this.baseUrl}/council-member/all`,);
  }
 



  getMemberDetails(id: any) {
    return this.httpClient.get(`${this.baseUrl}/council-member/${id}`);
  }

  getMeetingFormDetails(id: any) {
    return this.httpClient.get(`${this.baseUrl}/api/meetings/${id}`);
  }

  updateMeeting(id: any, meetingData: any) {
    console.log('Sending Update Request to API:', id, meetingData); // Debugging
    return this.httpClient.put(`${this.baseUrl}/api/meetings/updatemeeting/${id}`, meetingData);
  }


  updatePostponeMeeting(id: any, meetingData: any) {
    console.log('Sending Update Request to API:', id, meetingData); // Debugging
    return this.httpClient.put(`${this.baseUrl}/api/meetings/postpone/${id}`, meetingData);
  }

  updateCancelledMeeting(id: any, meetingData: any) {
    console.log('Sending Update Request to API:', id, meetingData); // Debugging
    return this.httpClient.put(`${this.baseUrl}/api/meetings/cancel/${id}`, meetingData);
  }


  deleteCouncilMember(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/council-member/${id}`);
  }
  deleteMeeting(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/meetings/${id}`);
  }
  deleteMaterialfromSupply(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/work/deleteSupplyById/${id}`);
  }

  createMeetingReuestForm(payload: any) {
    return this.httpClient.post(`${this.baseUrl}/api/meetings`, payload);
  }

  getAllPostponedReport(payload: any) {
    return this.httpClient.post(`${this.baseUrl}/api/meetings/postponed`, payload);
  }

getAllCancelledReport(townPanchayat: any) {
    const params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.post(`${this.baseUrl}/api/meetings/canceled`, {}, { params });
}

  meetingFilePath(formData: FormData): Observable<any> {
    const apiUrl = `${this.baseUrl}/api/files/upload`;
    return this.httpClient.post(apiUrl, formData);
  }



  //////// dtppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp

  private dtpId: any;
  setDtpId(id: any) {
    this.dtpId = id;

  }
  getDtpId() {
    return this.dtpId
  }

  getDropdown(endPoint: string, townPanchayath: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('townPanchayath', townPanchayath);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getAlldata(endPoint: string, townPanchayat: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('townPanchayat', townPanchayat)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }

  getDtaById(endPoint: string, townPanchayath: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams().set('townPanchayath', townPanchayath);

    return this.httpClient.get(finalURL, { params }); // ✅ Passing only townPanchayat as a query param
  }
  getDtaById2(endPoint: string, townPanchayat: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.get(finalURL, { params }); // ✅ Passing only townPanchayat as a query param
  }
  update_Eo(endPoint: string, InchargePerson: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams().set('InchargePerson', InchargePerson);

    return this.httpClient.get(finalURL, { params }); // ✅ Passing only townPanchayat as a query param
  }
  deleteById(id: number): Observable<any> {


    // Perform the DELETE request, passing only the ID in the URL
    return this.httpClient.delete<any>(
      `${this.baseUrl}/api/work/deleteById/${id}`,

    );
  }

  // pl/sl/ws
  getAllData1(endPoint: string, inchargePerson: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('inchargePerson', inchargePerson)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }

  vendorlist1(
    pageNo: number,
    pageSize: number,
    townPanchayat: string,
    searchTerm?: string,
    typeOfWork?: string,
    categoryOfWork?: any,
    requirementFrom?: string,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('townPanchayat', townPanchayat);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    if (categoryOfWork) {
      params = params.append('categoryOfWork', categoryOfWork);
    }
    if (requirementFrom) {
      params = params.append('requirementFrom', requirementFrom);
    }
    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/work/work/getAll`, options);
  }
  vendorlist2(
    pageNo: number,
    pageSize: number,
    inchargePerson: string,
    searchTerm?: string,
    typeOfWork?: string,
    categoryOfWork?: any,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('inchargePerson', inchargePerson);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    if (categoryOfWork) {
      params = params.append('categoryOfWork', categoryOfWork);
    }

    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/work/phslws/getAll`, options);
  }


  getDtaById1(endPoint: string, inchargePerson: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    let params = new HttpParams()
      .set('id', id.toString())
      .set('inchargePerson', inchargePerson);


    return this.httpClient.get(finalURL, { params }); // ✅ Passing both id & InchargePerson as query params
  }
  getData_Eo(endPoint: string, inchargePerson: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams()
      .set('inchargePerson', inchargePerson);


    return this.httpClient.get(finalURL, { params }); // ✅ Passing both id & InchargePerson as query params
  }

  updateByData(endPoint: string, inchargePerson: string, id: number, requestBody: any) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams().set('inchargePerson', inchargePerson);

    return this.httpClient.put(finalURL, requestBody, { params }); // ✅ Using PUT to send request body
  }
  updateBy_EO(endPoint: string, townPanchayat: string, id: number, requestBody: any) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;

    let params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.put(finalURL, requestBody, { params }); // ✅ Using PUT to send request body
  }
  stockList_Eo_Filter(
    pageNo: number,
    pageSize: number,
    townPanchayat: string,
    searchTerm?: string,
    typeOfWork?: string,
    categoryOfWork?: any,
    // materialName?: string,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('townPanchayat', townPanchayat);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    if (categoryOfWork) {
      params = params.append('categoryOfWork', categoryOfWork);
    }
    // if (materialName) {
    //   params = params.append('materialName', materialName);
    // }
    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/work/EoStocklist/getAll`, options);
  }
  stockList_Sub_Filter(
    pageNo: number,
    pageSize: number,
    inchargePerson: string,
    searchTerm?: string,
    typeOfWork?: string,
    categoryOfWork?: any,
    materialName?: string,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('inchargePerson', inchargePerson);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    if (categoryOfWork) {
      params = params.append('categoryOfWork', categoryOfWork);
    }
    if (materialName) {
      params = params.append('materialName', materialName);
    }
    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/work/stockList`, options);

  }
  getDashboard1(endPoint: string, townPanchayat: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  // getDashboard(endPoint: string) {
  //   let finalURL = `${this.baseUrl}${endPoint}`;

  //   // Set request parameters

  //   return this.httpClient.get(finalURL); // ✅ Use GET instead of POST
  // }

  getDashboard(endPoint: string, params: any = {}) {
  let finalURL = `${this.baseUrl}${endPoint}`;

  // Construct query parameters
  const queryParams = new URLSearchParams();
  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach((value:any) => queryParams.append(key, value));
    } else {
      queryParams.append(key, params[key]);
    }
  }

  if (queryParams.toString()) {
    finalURL += `?${queryParams.toString()}`;
  }

  return this.httpClient.get(finalURL);
}

getDashboard_data(endPoint: string, townPanchayat?: string[]) {
  let finalURL = `${this.baseUrl}${endPoint}`;
  let params = new HttpParams();

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  return this.httpClient.get(finalURL, { params });
}

  getDurationReport(townPanchayat: any) {
        const params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.get(`${this.baseUrl}/api/meetings/report/duration`, { params });

  }

  getAllReport(townPanchayat: any) {
        const params = new HttpParams().set('townPanchayat', townPanchayat);

    return this.httpClient.post(`${this.baseUrl}/api/meetings/report`,{}, { params });

  }
// AD LOGIN AND DIRECTORATE 
 getDistrict(zone: any) {
    return this.httpClient.get(`${this.baseUrl}/api/districts?zone=${zone}`);
  }

getTownPanchayats(districtName: string | string[]): Observable<any> {
  const districtNameParam = Array.isArray(districtName)
    ? districtName.join(',')
    : districtName;

  const params = new HttpParams().set('districtName', districtNameParam);

  return this.httpClient.get<any>(`${this.baseUrl}/api/townPanchayats`, { params });
}
 apiPostCall(postParam: any, endPoint: string) {
    let token = sessionStorage.getItem('token');  // Retrieve the token from session storage
    let finalURL = `${this.baseUrl}` + endPoint;

    return this.httpClient.post(finalURL, postParam);
  }
  createMeetingRequestForm(payload: any) {
    return this.httpClient.post(`${this.baseUrl}/api/meetings/create`, payload);
  }
  postponedFormArrayDelete(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/api/meetings/postponseDelete/${id}`);
  }

    getAlldata_zone(endPoint: string, zone: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('zone', zone)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }

vendorlist1_zone(
  pageNo: number,
  pageSize: number,
  zone: string,
  searchTerm?: string,
  districts?:string[],
  townPanchayat?: string[],
  typeOfWork?: string,
  // categoryOfWork?: string,
  requirementFrom?: string,
  nameOfWork?: string
): Observable<any> {
  let params = new HttpParams()
    .append('pageNo', pageNo.toString())
    .append('pageSize', pageSize.toString())
    .append('zone', zone);

  if (searchTerm) {
    params = params.append('searchTerm', searchTerm);
  }
 if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }
 
  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  if (typeOfWork) {
    params = params.append('typeOfWork', typeOfWork);
  }
  // if (categoryOfWork) {
  //   params = params.append('categoryOfWork', categoryOfWork);
  // }
  if (requirementFrom) {
    params = params.append('requirementFrom', requirementFrom);
  }
  if (nameOfWork) {
    params = params.append('nameOfWork', nameOfWork);
  }

  const options = { params };

  return this.httpClient.get<any>(`${this.baseUrl}/api/ad/getAll`, options);
}


// Directorate
  getAlldata_Directorate(endPoint: string, directorate: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('directorate', directorate)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }


  vendorlist1_Directorate(
  pageNo: number,
  pageSize: number,
  directorate: string,
  searchTerm?: string,
  districts?:string[],
  townPanchayat?: string[],
  typeOfWork?: string,
  // categoryOfWork?: string,
  requirementFrom?: string,
  nameOfWork?: string
): Observable<any> {
  let params = new HttpParams()
    .append('pageNo', pageNo.toString())
    .append('pageSize', pageSize.toString())
    .append('directorate', directorate);

  // Conditionally add optional parameters if they are provided
  if (searchTerm) {
    params = params.append('searchTerm', searchTerm);
  }

  // Append multiple district values separately
   if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }
  // Append multiple townPanchayat values separately
  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  if (typeOfWork) {
    params = params.append('typeOfWork', typeOfWork);
  }
  // if (categoryOfWork) {
  //   params = params.append('categoryOfWork', categoryOfWork);
  // }
  if (requirementFrom) {
    params = params.append('requirementFrom', requirementFrom);
  }
  if (nameOfWork) {
    params = params.append('nameOfWork', nameOfWork);
  }

  const options = { params };

  return this.httpClient.get<any>(`${this.baseUrl}/api/directorate/getAll`, options);
}

 getDtaById_zone_directorate(endPoint: string, id: number) {
    let finalURL = `${this.baseUrl}${endPoint}/${id}`;


    return this.httpClient.get(finalURL); // ✅ Passing only townPanchayat as a query param
  }
  // Stock for AD &DIRECTORATE
    getAlldatastock_zone(endPoint: string, zone: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('zone', zone)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }
  stockList_zone_Filter(
    pageNo: number,
    pageSize: number,
    zone: string,
    searchTerm?: string,
    districts?:string[],
  townPanchayat?: string[],
    typeOfWork?: string,
    // categoryOfWork?: string,
    materialName?: string,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('zone', zone);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
     if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }
    if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    // if (categoryOfWork) {
    //   params = params.append('categoryOfWork', categoryOfWork);
    // }
    if (materialName) {
      params = params.append('materialName', materialName);
    }
    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/ad/stock/getAll`, options);
  }
    getAlldatastock_Directorate(endPoint: string, directorate: string, page: number, size: number) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('directorate', directorate)
      .set('page', page.toString())  // Convert number to string
      .set('size', size.toString()); // Convert number to string

    return this.httpClient.get(finalURL, { params }); // ✅ Passing multiple query params
  }
  stockList_Directorate_Filter(
    pageNo: number,
    pageSize: number,
    directorate: string,
    searchTerm?: string,
    districts?:string[],
  townPanchayat?: string[],
    typeOfWork?: string,
    // categoryOfWork?: string,
    materialName?: string,
    nameOfWork?: string
  ): Observable<any> {

    let params = new HttpParams()
      .append('pageNo', pageNo.toString())
      .append('pageSize', pageSize.toString())
      .append('directorate', directorate);

    // Conditionally add optional parameters if they are provided
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
       if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }
    if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }
    if (typeOfWork) {
      params = params.append('typeOfWork', typeOfWork);
    }
    // if (categoryOfWork) {
    //   params = params.append('categoryOfWork', categoryOfWork);
    // }
    if (materialName) {
      params = params.append('materialName', materialName);
    }
    if (nameOfWork) {
      params = params.append('nameOfWork', nameOfWork);
    }

    const options = { params };

    return this.httpClient.get<any>(`${this.baseUrl}/api/directorate/stock/getAll`, options);
  }
  getDashboard_zone(endPoint: string, zone: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('zone', zone);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getDashboard_zone_filter(endPoint: string, zone: string,districtName?:string[],townPanchayat?: string[],
) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('zone', zone);
     if (districtName && districtName.length > 0) {
    districtName.forEach(district => {
      params = params.append('districtName', district);
    });
  }
 if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getDashboard_directorate_filter(endPoint: string, directorate: string,districtName?:string[],townPanchayat?: string[],
) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('directorate', directorate);
     if (districtName && districtName.length > 0) {
    districtName.forEach(district => {
      params = params.append('districtName', district);
    });
  }
 if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getDashboard_Directorate(endPoint: string, directorate: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('directorate', directorate);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
getAllMemberDetailsEO(townPanchayat: any) {
    return this.httpClient.get(`${this.baseUrl}/council-member/all?townPanchayat=${townPanchayat}`,);
  }
getAllMemberDetailsAD(endPoint: string, pageNo: number, pageSize: number, zone: string, districts?: string[], townPanchayat?: string[],
  ) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('zone', zone)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
    if (districts && districts.length > 0) {
      districts.forEach(district => {
        params = params.append('districts', district);
      });
    }
    if (townPanchayat && townPanchayat.length > 0) {
      townPanchayat.forEach(tp => {
        params = params.append('townPanchayat', tp);
      });
    }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getAllMeetingFormDataAD(endPoint: string, pageNo: number, pageSize: number, zone: string, districts?: string[], townPanchayat?: string[],
  ) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('zone', zone)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
    if (districts && districts.length > 0) {
      districts.forEach(district => {
        params = params.append('districts', district);
      });
    }
    if (townPanchayat && townPanchayat.length > 0) {
      townPanchayat.forEach(tp => {
        params = params.append('townPanchayat', tp);
      });
    }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getAllMeetingFormData(townPanchayat: any) {
    return this.httpClient.get<any[]>(`${this.baseUrl}/api/meetings/getAll?townPanchayat=${townPanchayat}`,);
  }


  getAllMemberDetailsDirectorate(endPoint: string, pageNo: number, pageSize: number, directorate: string, districts?: string[], townPanchayat?: string[],
  ) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('directorate',directorate)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
    if (districts && districts.length > 0) {
      districts.forEach(district => {
        params = params.append('districts', district);
      });
    }
    if (townPanchayat && townPanchayat.length > 0) {
      townPanchayat.forEach(tp => {
        params = params.append('townPanchayat', tp);
      });
    }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
    getAllMeetingFormDataDirectorate(endPoint: string, pageNo: number, pageSize: number, directorate: string, districts?: string[], townPanchayat?: string[],
  ) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams()
      .set('directorate', directorate)
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
    if (districts && districts.length > 0) {
      districts.forEach(district => {
        params = params.append('districts', district);
      });
    }
    if (townPanchayat && townPanchayat.length > 0) {
      townPanchayat.forEach(tp => {
        params = params.append('townPanchayat', tp);
      });
    }
    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
report_zone(
  zone: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('zone', zone);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.post<any>(`${this.baseUrl}/api/ad/report`, {}, options);
}
report_zone_Cancel(
  zone: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('zone', zone);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.get<any>(`${this.baseUrl}/api/ad/canceled`, options);
}
report_zone_Duration(
  zone: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('zone', zone);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.post<any>(`${this.baseUrl}/api/ad/duration/report`,{}, options);
}
// Directorate
report_directorate(
  directorate: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('directorate', directorate);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.post<any>(`${this.baseUrl}/api/directorate/report`, {}, options);
}
report_directorate_Cancel(
  directorate: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('directorate', directorate);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.get<any>(`${this.baseUrl}/api/directorate/canceled`, options);
}

report_directorate_Duration(
  directorate: string,
  districts?: string[],
  townPanchayat?: string[],
): Observable<any> {
  let params = new HttpParams().set('directorate', directorate);

  if (districts && districts.length > 0) {
    districts.forEach(district => {
      params = params.append('districts', district);
    });
  }

  if (townPanchayat && townPanchayat.length > 0) {
    townPanchayat.forEach(tp => {
      params = params.append('townPanchayat', tp);
    });
  }

  const options = { params };

  return this.httpClient.post<any>(`${this.baseUrl}/api/directorate/duration/report`,{}, options);
}

  getNameOfwork(endPoint: string, inchargePerson: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('inchargePerson', inchargePerson);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }
  getMaterialName(endPoint: string, inchargePerson: string) {
    let finalURL = `${this.baseUrl}${endPoint}`;

    // Set request parameters
    let params = new HttpParams().set('inchargePerson', inchargePerson);

    return this.httpClient.get(finalURL, { params }); // ✅ Use GET instead of POST
  }


}

