import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public searchString
  public singleIssueId
  public createIssueFlag
  public showIssueFlag
  // for local
  // baseUrl = 'http://localhost:3004/api/v1/app';
  // for nginx
  baseUrl = 'http://api.showcasemyskills.xyz/api/v1/app';
  constructor(private http: HttpClient) {


  }

  userSignup = (data) => {
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('email', data.email)
      .set('password', data.password);

    let response = this.http.post(this.baseUrl + '/register', bodyParams);
    return response;
  }

  userLogin = (data) => {
    const bodyParams = new HttpParams()
      .set('usernameEmail', data.usernameEmail)
      .set('password', data.password);

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

  logout = (authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    let response = this.http.post(`${this.baseUrl}/logOut`, {}, { headers: header });
    return response;
  }
  getLocalStorage = (userData) => {
    return localStorage.getItem(userData);
  }

  setLocalStorage = (userData) => {
    localStorage.setItem('userDetails', JSON.stringify(userData));
  }

  deleteFromLocalstorage = (key) => {
    localStorage.removeItem(key)
  }



  dashboardInfo = (authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/viewDashboard`, { headers: header });
    return response;
  }

  filterRowsByStatus = (status, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/filterByStatus/${status}`, { headers: header });
    return response;
  }

  filterRowsByDate = (creationDate, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/filterByDate/${creationDate}`, { headers: header });
    return response;
  }

  filterRowsByReporterId = (reporterName, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/filterByReporter/${reporterName}`, { headers: header });
    return response;
  }

  filterRowsByTitle = (title, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/filterByTitle/${title}`, { headers: header });
    return response;
  }

  filterRowsByStatusSearchView = (status,searchString, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
      , text = searchString
    let response = this.http.get(`${this.baseUrl}/filterByStatus/${status}/${text}`, { headers: header });
    return response;
  }

  filterRowsByDateSearchView = (creationDate,searchString,  authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
      , text = searchString
    let response = this.http.get(`${this.baseUrl}/filterByDate/${creationDate}/${text}`, { headers: header });
    return response;
  }

  filterRowsByReporterIdSearchView = (reporterName,searchString,  authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
      , text = searchString
    let response = this.http.get(`${this.baseUrl}/filterByReporter/${reporterName}/${text}`, { headers: header });
    return response;
  }

  filterRowsByTitleSearchView = (title,searchString,  authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
      , text = searchString
    let response = this.http.get(`${this.baseUrl}/filterByTitle/${title}/${text}`, { headers: header });
    return response;
  }

  sortByColumns = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )

    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('createdOn', data.createdOn)
      .set('reporterId', data.reporterId)
      .set('title', data.title);
    let response = this.http.post(`${this.baseUrl}/sortByColumns`, bodyParams, { headers: header });
    return response;
  }

  sortSearch = (data, searchString, authToken) => {
    let text = searchString
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('createdOn', data.createdOn)
      .set('reporterId', data.reporterId)
      .set('text', text)
      .set('title', data.title);
    let response = this.http.post(`${this.baseUrl}/sortSearch`, bodyParams, { headers: header });
    return response;
  }

  reportBug = (data, authToken) => {
    let formData: FormData = new FormData()
    if (data.attachments.length > 0) {
      if (data.attachments[0] != undefined) {
        formData.set('attachments', data.attachments[0], data.attachments[0].name)
      }
    }
    else {
      formData.set('attachments', data.attachments)
    }
    formData.append('status', data.status)
    formData.append('title', data.title)
    formData.append('assigneeName', data.assigneeName)
    formData.append('description', data.description)

    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )

    let response = this.http.post(`${this.baseUrl}/createIssue`, formData, { headers: header });
    return response;
  }

  comment = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('issueId', data.issueId)
      .set('comment', data.comment);
    let response = this.http.post(`${this.baseUrl}/comment`, bodyParams, { headers: header });
    return response;
  }

  showAllComments = (issueId, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/allComments/${issueId}`, { headers: header });
    return response;
  }

  addAsWatcher = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('userId', data.userId)
      .set('issueId', data.issueId)
      .set('userName', data.userName);
    let response = this.http.post(`${this.baseUrl}/addAsWatcher`, bodyParams, { headers: header });
    return response;
  }

  listWatchers = (issueId, authToken) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/listWatchers/${issueId}`, { headers: header });
    return response;
  }
  assignIssue = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('assigneeUsername', data.username)
      .set('issueId', data.issueId);
    let response = this.http.post(`${this.baseUrl}/assignIssue`, bodyParams, { headers: header });
    return response;
  }


  singleIssueDetails = (issueId, authToken) => {

    const header = new HttpHeaders().set('authToken', authToken)
    let response = this.http.get(`${this.baseUrl}/singleIssueDetails/${issueId}`, { headers: header });
    return response;


  }

  search = (authToken, searchText) => {
    const header = new HttpHeaders().set('authToken', authToken)
    let text = searchText
    let response = this.http.get(`${this.baseUrl}/search/${text}`, { headers: header });
    return response;
  }


  getIssueId = (id) => {
    this.singleIssueId = id
  }

  receiveIssueDescriptionFlags = (key) => {

    if (key === 'showIssueFlag') {
      this.showIssueFlag = true
      this.createIssueFlag = false
    }
    else if (key === 'createIssueFlag') {
      this.createIssueFlag = true
      this.showIssueFlag = false
    }
  }



  editIssue = (authToken, data) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const formData = new FormData()
    formData.set('title', data.title)
    formData.set('description', data.description)
    formData.set('status', data.status)
    formData.set('issueId', data.issueId)

    if (data.attachments.length > 0) {
      if (data.attachments[0] != undefined) {
        formData.set('attachments', data.attachments[0], data.attachments[0].name)
      }
    }
    else {
      formData.set('attachments', data.attachments)
    }



    let response = this.http.put(`${this.baseUrl}/editIssue`, formData, { headers: header })
    return response;
  }

  notificationHistory = (authToken, userId) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    let response = this.http.get(`${this.baseUrl}/notificationHistory/${userId}`, { headers: header });
    return response;
  }

  saveReporterNotificationHistory = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('msg', data.msg)
      .set('issueId', data.issueId);
    let response = this.http.post(`${this.baseUrl}/ReporterNotificationHistory`, bodyParams, { headers: header });
    return response;
  }

  saveWatcherNotificationHistory = (data, authToken) => {
    let header = new HttpHeaders(
      {
        'authToken': authToken
      }
    )
    const bodyParams = new HttpParams()
      .set('msg', data.msg)
      .set('issueId', data.issueId);
    let response = this.http.post(`${this.baseUrl}/WatcherNotificationHistory`, bodyParams, { headers: header });
    return response;
  }

  public handleError = (err: HttpErrorResponse) => {

    return err.message;

  }
}
