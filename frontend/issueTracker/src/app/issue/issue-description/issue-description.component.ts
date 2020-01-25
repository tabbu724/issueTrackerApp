import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";




@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.css']
})
export class IssueDescriptionComponent implements OnInit {
public authToken
public issueInfo
public title
public description
public file
public status
public attachments
public assigneeName
public editflag=false
public createIssueFlag
public showIssueFlag
public currentDetails
  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }

showissue=()=>{
  this.showIssueFlag=true
  this.hitApis.singleIssueDetails(this.authToken).subscribe(
    response=>{
      if (response['status'] == 200) {
        this.currentDetails=true
        this.issueInfo=response['data']
        this.title=this.issueInfo.title
        this.description=this.issueInfo.description
      }
      else{
        this.toastr.error( response['message']);
      }
    },
    error=>{
      let message = this.hitApis.handleError(error);
      this.toastr.error(message)
    }
  )
}
edit=()=>{
  this.editflag=false
let data={
  title:this.title,
  description:this.description,
  file:this.file
}
this.hitApis.editIssue(this.authToken,data).subscribe(
  response=>{
    if (response['status'] == 200) {
      console.log(response['data']);
      
    }
    else{
      this.toastr.error( response['message']);
    }
  },
  error=>{
    let message = this.hitApis.handleError(error);
    this.toastr.error(message)
  }
)
}

createIssue=()=>{
  this.createIssueFlag=true
  let data={
    status:this.status,
    title:this.title,
    attachments:this.attachments,
    assigneeName:this.assigneeName,
    description:this.description
  }
this.hitApis.reportBug(data,this.authToken).subscribe(
  response=>{
    if (response['status'] == 200) {
      console.log(response['data']);
      this.toastr.success('new issue created')
    }
    else{
      this.toastr.error( response['message']);
    }
  },
  error=>{
    let message = this.hitApis.handleError(error);
    this.toastr.error(message)
  }
)
}

setEditFlag=()=>{
this.editflag=true
}

logout = () => {
  this.hitApis.logout(this.authToken).subscribe(
    response => {
      if (response['status'] == 200) {
        this.cookie.remove('authToken')
        this.cookie.remove('userId')
        this.cookie.remove('userName')
        this.toastr.success('Successfully logged out.')
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response['message']);
      }
    },
    error => {
      let message = this.hitApis.handleError(error);
      this.toastr.error(message)
    }
  )
}


  ngOnInit() {
    this.authToken=this.cookie.get('authToken')
    let flag=this.hitApis.sendIssueDescriptionFlags()
    if(flag==='showIssueFlag'){
     
      this.showissue()
    }
    else if(flag==='createIssueFlag'){
  
this.createIssue()
    }
  }

}
