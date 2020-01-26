import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.css']
})
export class IssueDescriptionComponent implements OnInit {
public authToken
public userName
public userId
public issueInfo
public title
public newtitle
public description
public newdescription
public htmlContent
public file
public status
public newstatus
public attachmentString
public attachments =[]
public assigneeName
public newassigneeName
public issueDate
public createdIssueId=0
public singleIssueId
public editflag=false
public createIssueFlag
public showIssueFlag
public currentDetails
public watcherData
public comment
public allComments
public keys
public editTitle
public  editDescription 
public editStatus
public editAssignee
public config: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  customClasses: [
    {
      name: "quote",
      class: "quote",
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1",
    },
  ]
}
  constructor(private hitApis: ApiService, private socket: SocketService,private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }

  formatDate=(response)=>{
    
      let formattedDate = new Date(response['creationDate']).toDateString()
      let formattedTime = new Date(response['creationDate']).toLocaleTimeString()
      let displayDate = `${formattedDate} , ${formattedTime}`
      console.log('display date',displayDate);
      
      return displayDate
    
  }

  // textEditorContents=()=>{
  //   this.htmlContent =document.getElementById('').innerHTML
  //   console.log(this.htmlContent);
    
  // }

showissue=()=>{
  // this.showIssueFlag=true
  if(!this.createdIssueId){
    this.hitApis.singleIssueDetails(0,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          // this.currentDetails=true
          this.issueInfo=response['data']
          console.log(this.issueInfo);
          this.singleIssueId=this.issueInfo.issueId
          this.title=this.issueInfo.title
          this.description=this.issueInfo.description
  this.status=this.issueInfo.status
  this.assigneeName=this.issueInfo.assigneeName
  if(this.issueInfo.attachmentUrls!=null){
    this.issueInfo.attachmentUrls.forEach(urlObject => {
      let fileData={
        filename:urlObject.fileName,
        fileUrl:urlObject.fileUrl
      }
      this.attachments.push(fileData)
      console.log(this.attachments)
    });
  }
 
  // this.attachments=this.issueInfo.attachmentUrls
  this.issueDate=this.formatDate(this.issueInfo)
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
  else{
    this.hitApis.singleIssueDetails(this.createdIssueId,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          // this.currentDetails=true
          this.issueInfo=response['data']
          console.log('created issue details on show issue',this.issueInfo);
          
          this.title=this.issueInfo.title
          this.description=this.issueInfo.description
  this.status=this.issueInfo.status
  this.assigneeName=this.issueInfo.assigneeName
  if(this.issueInfo.attachmentUrls!=null){
    this.issueInfo.attachmentUrls.forEach(urlObject => {
      let fileData={
        filename:urlObject.fileName,
        fileUrl:urlObject.fileUrl
      }
      this.attachments.push(fileData)
      console.log(this.attachments)
    });
  }
  // this.attachments=this.issueInfo.attachmentUrls
  this.issueDate=this.formatDate(this.issueInfo)
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
  
}


edit=()=>{
  // this.editflag=false
let data={
  title:this.newtitle||null,
  description:this.newdescription||null,
  status:this.newstatus||null
}
this.hitApis.editIssue(this.authToken,data).subscribe(
  response=>{
    if (response['status'] == 200) {
      console.log(response['data']);
      this.editAssignee=false
      this.editDescription=false
      this.editStatus=false
      this.editTitle=false
      this.toastr.success('Info updated')
      this.showissue()
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

addWatcher=()=>{
  this.userName = this.cookie.get('userName')
  
  this.userId = this.cookie.get('userId')
  let data
  console.log(this.userName,this.userId);
  if(this.createdIssueId!=0){
    data={
      userName:this.userName,
      userId:this.userId,
      issueId:this.createdIssueId
    }
  }
  else{
    data={
      userName:this.userName,
      userId:this.userId,
      issueId:this.singleIssueId
    }
  }
  
  
  this.hitApis.addAsWatcher(data,this.authToken).subscribe(
    response=>{
      if (response['status'] == 200) {
        // console.log(response['data']);
        this.toastr.success(response['message'])
        this.updateOthers(response['message'])
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

showWatchers=()=>{
  if(this.createdIssueId!=0){
    this.hitApis.listWatchers(this.createdIssueId,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          // console.log(response['data']);
          this.toastr.success('Here are the watchers.')
          this.watcherData=Object.values( response['data'])
          console.log(this.watcherData);
          
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
  else{
    this.hitApis.listWatchers(this.singleIssueId,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          // console.log(response['data']);
          this.toastr.success('Here are the watchers.')
          this.watcherData=Object.values( response['data'])
          console.log(this.watcherData);
          
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
 
}

createComment=()=>{
  let data
  if(this.createdIssueId!=0){
     data={
      username:this.userName,
      issueId:this.createdIssueId,
      comment:this.comment
    }
  }
  else{
     data={
      username:this.userName,
      issueId:this.singleIssueId,
      comment:this.comment
    }
  }
  
  this.hitApis.comment(data,this.authToken).subscribe(
    response=>{
      if (response['status'] == 200) {
        // console.log(response['data']);
        this.toastr.success('Comment added.')
        console.log('comment',response['data']);
        this.keys=Object.keys( response['data'])
        let list=[]
        for(let x of this.keys){
list.push(response['data'].x)
        }
        this.allComments=list
        // this.watcherData=Object.values( response['data'])
        // console.log(this.watcherData);
        
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
  if(! this.title){
    this.toastr.warning('Title should be mentioned.')
  }
  else if(! this.htmlContent){
    this.toastr.warning('Description should be mentioned.')
  }
  else if(! this.assigneeName){
    this.toastr.warning('Assignee Name should be mentioned.')
  }
  else if(! this.status){
    this.toastr.warning('status should be mentioned.')
  }
  else{
    console.log(`attachmentString ${this.attachmentString}`);
    let attachments=[this.attachmentString]
    console.log(attachments)
    // this.attachments.push(this.attachmentString)
    let data={
      status:this.status,
      title:this.title,
      attachments:attachments,
      assigneeName:this.assigneeName,
      description:this.htmlContent
    }
    
    console.log(data);
    
  this.hitApis.reportBug(data,this.authToken).subscribe(
    response=>{
      if (response['status'] == 200) {
        console.log(response['data']);
        this.createdIssueId=response['data'].issueId
        this.toastr.success('New issue created.')
        this.updateOthers(`new issue created by ${this.userId} with title ${response['data'].title}`)
        this.hitApis.receiveIssueDescriptionFlags('showIssueFlag')
        setTimeout(() => {
          console.log('taking to issue descr');
          this.createIssueFlag=false
          this.showIssueFlag=true
          this.showissue()
          // this._router.navigate(['/issueDescription']);
        }, 1000);
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
  
}


editTitles=()=>{
this.editTitle=true
}

editDescriptions=()=>{
this.editDescription=true
}
editStatuses=()=>{
  this.editStatus=true
}
editAssignees=()=>{
  this.editAssignee=true
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
        this.disconnect()
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


updateOthers=(msg)=>{
  let details={
    reporterId:this.userId,
    msg:msg
  }
  this.socket.sendNotification(details)
}

disconnect=()=>{
  this.socket.exitSocket()
  
}

  ngOnInit() {
    this.authToken=this.cookie.get('authToken')
    this.userName = this.cookie.get('userName')
    this.userId = this.cookie.get('userId')
    let flag=this.hitApis.sendIssueDescriptionFlags()
    console.log(flag);
    
    if(flag==='showIssueFlag'){
     this.showIssueFlag=true
      this.showissue()
    }
    else if(flag==='createIssueFlag'){
      this.createIssueFlag=true
// this.createIssue()
    }
  }

}
