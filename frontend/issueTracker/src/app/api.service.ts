import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams ,HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
public searchString
public singleIssueId
public createIssueFlag
public showIssueFlag

  baseUrl = 'http://localhost:3004/api/v1/app';
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

  logout=(authToken)=>{
    const bodyParams = new HttpParams()
      .set('authToken', authToken)
    // const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.post(`${this.baseUrl}/logOut`, bodyParams);
    return response;
  }
  getLocalStorage = (userData) => {
    return localStorage.getItem(userData);
  }

  setLocalStorage = (userData) => {
    localStorage.setItem('userDetails', JSON.stringify(userData));
  }

deleteFromLocalstorage=(key)=>{
  localStorage.removeItem(key)
}



  dashboardInfo=(authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/viewDashboard`,{headers:header});
    return response;
  }

  filterRowsByStatus=(status,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/filterByStatus/${status}`,{headers:header});
    return response;
  }

  filterRowsByDate=(creationDate,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/filterByDate/${creationDate}`,{headers:header});
    return response;
  }

  filterRowsByReporterId=(reporterName,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/filterByReporter/${reporterName}`,{headers:header});
    return response;
  }

  filterRowsByTitle=(title,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/filterByTitle/${title}`,{headers:header});
    return response;
  }

  filterRowsByStatusSearchView=(status,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    ,text=this.searchString
    let response = this.http.get(`${this.baseUrl}/filterByStatus/${status}/${text}`,{headers:header});
    return response;
  }

  filterRowsByDateSearchView=(creationDate,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    ,text=this.searchString
    let response = this.http.get(`${this.baseUrl}/filterByDate/${creationDate}/${text}`,{headers:header});
    return response;
  }

  filterRowsByReporterIdSearchView=(reporterName,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    ,text=this.searchString
    let response = this.http.get(`${this.baseUrl}/filterByReporter/${reporterName}/${text}`,{headers:header});
    return response;
  }

  filterRowsByTitleSearchView=(title,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    ,text=this.searchString
    let response = this.http.get(`${this.baseUrl}/filterByTitle/${title}/${text}`,{headers:header});
    return response;
  }

  sortByColumns=(data,authToken)=>{
    // const header=new HttpHeaders().set('authToken',authToken)
    console.log('data.title',data.title);
    
    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('createdOn', data.createdOn)
      .set('reporterId', data.reporterId)
      .set('authToken', authToken)
      .set('title', data.title);
    let response = this.http.post(`${this.baseUrl}/sortByColumns`, bodyParams);
    return response;
  }

sortSearch=(data,authToken)=>{
  let text=this.searchString
  const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('createdOn', data.createdOn)
      .set('reporterId', data.reporterId)
      .set('authToken', authToken)
      .set('text', text)
      .set('title', data.title);
    let response = this.http.post(`${this.baseUrl}/sortSearch`, bodyParams);
    return response;
}

  reportBug=(data,authToken)=>{
    // const header=new HttpHeaders().set('authToken',authToken)
    const bodyParams = new HttpParams()
      .set('status', data.status)
      .set('title', data.title)
      .set('attachments', data.attachments)
      .set('assigneeName', data.assigneeName)
      .set('authToken',authToken)
      .set('title', data.description);
    let response = this.http.post(`${this.baseUrl}/createIssue`, bodyParams);
    return response;
  }

  comment=(data,authToken)=>{
    // const header=new HttpHeaders().set('authToken',authToken)
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('issueId', data.issueId)
      .set('authToken',authToken)
      .set('comment', data.comment);
    let response = this.http.post(`${this.baseUrl}/comment`,  bodyParams);
    return response;
  }

  addAsWatcher=(data,authToken)=>{
    // const header=new HttpHeaders().set('authToken',authToken)
    const bodyParams = new HttpParams()
      .set('userId', data.userId)
      .set('issueId', data.issueId)
      .set('authToken',authToken)
      .set('userName', data.userName);
    let response = this.http.post(`${this.baseUrl}/addAsWatcher`, bodyParams);
    return response;
  }

  listWatchers=(issueId,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/listWatchers/${issueId}`,{headers:header});
    return response;
  }
  assignIssue=(data,authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    const bodyParams = new HttpParams()
      .set('username', data.username)
      .set('issueId', data.issueId);
    let response = this.http.post(`${this.baseUrl}/assignIssue`, { bodyParams,headers:header});
    return response;
  }

  
  singleIssueDetails=(issueId,authToken)=>{
    if(issueId){
      const header=new HttpHeaders().set('authToken',authToken)
      let response = this.http.get(`${this.baseUrl}/singleIssueDetails/${issueId}`,{headers:header});
      return response;
    }
    else{
      const header=new HttpHeaders().set('authToken',authToken)
    let response = this.http.get(`${this.baseUrl}/singleIssueDetails/${this.singleIssueId}`,{headers:header});
    return response;
    }
    
  }

  search=(authToken)=>{
    const header=new HttpHeaders().set('authToken',authToken)
    ,text=this.searchString
    let response = this.http.get(`${this.baseUrl}/search/${text}`,{headers:header});
    return response;
  }

supplySearchString=(text)=>{
this.searchString=text
}

sendSearchString=()=>{
  return this.searchString
}
getIssueId=(id)=>{
  this.singleIssueId=id
}

receiveIssueDescriptionFlags=(key)=>{
  console.log(`key = ${key}`);
  
  if(key==='showIssueFlag'){
    this.showIssueFlag=true
    this.createIssueFlag=false
  }
  else if(key==='createIssueFlag'){
this.createIssueFlag=true
this.showIssueFlag=false
}
}

sendIssueDescriptionFlags=()=>{
if(this.showIssueFlag===true){
  console.log('sending show to issue view');
  
  return 'showIssueFlag'
}
else if(this.createIssueFlag===true){
  console.log('sending create to issue view');
  
  return 'createIssueFlag'
}
}

editIssue=(authToken,data)=>{
  const header=new HttpHeaders().set('authToken',authToken)
  const bodyParams = new HttpParams()
      .set('title', data.username)
      .set('description', data.issueId)
      .set('file',data.file)
      let response = this.http.put(`/editIssue`,{bodyParams,headers:header})
      return response;
}

  public handleError=(err :HttpErrorResponse)=>{
    // console.log("handling errors");
    // console.log(err.message);
    // return Observable.throw(err.message);
    return err.message;
    
  }
}
