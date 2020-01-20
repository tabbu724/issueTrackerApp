import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/api/v1/app';
  constructor(private http: HttpClient) {
    console.log("service const called");

  }

  userSignup = (data) => {
    const bodyParams = new HttpParams()
      .set('userName', data.username)
      .set('email', data.email)
      .set('password', data.password);

    let response = this.http.post(this.baseUrl + '/register', bodyParams);
    return response;
  }

  userLogin = (data) => {
    const bodyParams = new HttpParams()
      .set('usernameEmail', data.usernameEmail)
      .set('password', data.password);
      console.log(bodyParams);
      
    let response = this.http.post(`${this.baseUrl}/login`, bodyParams);
    return response;
  }

  userLoginFb = () => {
   
    let response = this.http.get(`${this.baseUrl}/auth/facebook`);
    return response;
  }
  userLoginGoogle = () => {
    let response = this.http.get(`${this.baseUrl}/auth/google`);
    return response;
  }


  logout=(userId)=>{
    const bodyParams ={}
    let response = this.http.post(`${this.baseUrl}/logOut/${userId}`, bodyParams);
    return response;
  }
  getLocalStorage = (userData) => {
    return localStorage.getItem(userData);
  }

  setLocalStorage = (userData) => {
    localStorage.setItem('userDetails', JSON.stringify(userData));
  }





  dashboardInfo=(userId)=>{
    let response = this.http.get(`${this.baseUrl}/dashboard/${userId}`);
    return response;
  }

  filterRowsByStatus=(status)=>{
    let response = this.http.get(`${this.baseUrl}/filterByStatus/${status}`);
    return response;
  }

  filterRowsByDate=(creationDate)=>{
    let response = this.http.get(`${this.baseUrl}/filterByDate/${creationDate}`);
    return response;
  }

  filterRowsByReporterId=(reporterId)=>{
    let response = this.http.get(`${this.baseUrl}/filterByReporterId/${reporterId}`);
    return response;
  }

  filterRowsByTitle=(title)=>{
    
    let response = this.http.get(`${this.baseUrl}/filterByTitle/${title}`);
    return response;
  }

  sortByColumns=(data)=>{
    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('createdOn', data.createdOn)
      .set('reporterId', data.reporterId)
      .set('title', data.title);
    let response = this.http.post(`${this.baseUrl}/sortByColumns`, bodyParams);
    return response;
  }

  reportBug=(data)=>{
    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('title', data.title)
      .set('attachments', data.attachments)
      .set('username', data.username)
      .set('userId', data.userId)
      .set('title', data.description);
    let response = this.http.post(`${this.baseUrl}/createIssue`, bodyParams);
    return response;
  }

  comment=(data)=>{
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('issueId', data.issueId)
      .set('comment', data.comment);
    let response = this.http.post(`${this.baseUrl}/comment`, bodyParams);
    return response;
  }

  addAsWatcher=(data)=>{
    const bodyParams = new HttpParams()
      .set('userId', data.userId)
      .set('issueId', data.issueId)
      .set('userName', data.userName);
    let response = this.http.post(`${this.baseUrl}/addAsWatcher`, bodyParams);
    return response;
  }

  listWatchers=(issueId)=>{
    
    let response = this.http.get(`${this.baseUrl}/listWatchers/${issueId}`);
    return response;
  }
  assignIssue=(data)=>{
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('issueId', data.issueId);
    let response = this.http.post(`${this.baseUrl}/assignIssue`, bodyParams);
    return response;
  }
  search=(text)=>{
    
    let response = this.http.get(`${this.baseUrl}/search/${text}`);
    return response;
  }



  public handleError=(err :HttpErrorResponse)=>{
    // console.log("handling errors");
    // console.log(err.message);
    // return Observable.throw(err.message);
    return err.message;
    
  }
}
