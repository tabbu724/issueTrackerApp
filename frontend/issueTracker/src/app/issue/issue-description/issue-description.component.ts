import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SocketService } from 'src/app/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  public htmlContent
  public file
  public status
  public newstatus
  public attachmentString
  public attachments = []
  public assigneeName
  public newassigneeName
  public issueDate
  public createdIssueId = 0
  public singleIssueId
  public editFlag = false
  public editAssigneeFlag = false
  public editAttachmentFlag = false
  public createIssueFlag
  public showIssueFlag
  public currentDetails
  public watcherData
  public comment
  // public displayComment
  public allComments
  public editTitle
  public editDescription
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
  constructor(private hitApis: ApiService, private aroute: ActivatedRoute, private socket: SocketService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }



  showissue = () => {

    if (!this.createdIssueId) {
      // to show individual issue view
      this.hitApis.singleIssueDetails(this.singleIssueId, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {

            this.issueInfo = response['data']

            this.title = this.issueInfo.title
            this.description = this.issueInfo.description
            this.status = this.issueInfo.status
            this.assigneeName = this.issueInfo.assigneeName
            let list = []
            if (this.issueInfo.attachmentUrls != null) {
              this.issueInfo.attachmentUrls.forEach(urlObject => {
                let fileData = {
                  filename: urlObject.fileName,
                  fileUrl: urlObject.fileUrl
                }
                list.push(fileData)

              });
              this.attachments = list
            }


            this.issueDate = this.issueInfo['creationDate']
            this.showComments()
            // this.receiveNotifications()
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
    else {
      // to show report bug view
      this.hitApis.singleIssueDetails(this.createdIssueId, this.authToken).subscribe(

        response => {
          if (response['status'] == 200) {

            this.issueInfo = response['data']

            this.title = this.issueInfo.title
            this.description = this.issueInfo.description
            this.status = this.issueInfo.status
            this.assigneeName = this.issueInfo.assigneeName
            if (this.issueInfo.attachmentUrls != null) {
              this.issueInfo.attachmentUrls.forEach(urlObject => {
                let fileData = {
                  filename: urlObject.fileName,
                  fileUrl: urlObject.fileUrl
                }
                this.attachments.push(fileData)
              });
            }
            this.issueDate = this.issueInfo['creationDate']
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

  }

  setEditFlag = () => {
    this.editFlag = true
  }


  edit = () => {
    let attachments = [this.attachmentString]
    let data
    if (this.createdIssueId != 0) {
      data = {
        title: this.newtitle || this.title,
        description: this.description,
        status: this.newstatus || this.status,
        issueId: this.createdIssueId,
        attachments: attachments
      }
    }
    else {
      data = {
        title: this.newtitle || this.title,
        description: this.description,
        status: this.newstatus || this.status,
        issueId: this.singleIssueId,
        attachments: attachments
      }
    }
    this.hitApis.editIssue(this.authToken, data).subscribe(
      response => {
        if (response['status'] == 200) {

          this.editFlag = false
          this.editAttachmentFlag = false
          this.toastr.success('Info updated')
          let flags = response['data']['flags']
          if (flags.attachment == 1) {
            this.updateOthers(`${this.userName} has updated attachments for issue with id ${response['data']['issueId']}`)
          }
          if (flags.title == 1) {
            this.updateOthers(`${this.userName} has updated title for issue with id ${response['data']['issueId']}`)
          }
          if (flags.status == 1) {
            this.updateOthers(`${this.userName} has updated status for issue with id ${response['data']['issueId']}`)
          }
          if (flags.description == 1) {
            this.updateOthers(`${this.userName} has updated description for issue with id ${response['data']['issueId']}`)
          }
          this.showissue()
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

  addWatcher = () => {
    this.userName = this.cookie.get('userName')

    this.userId = this.cookie.get('userId')
    let data
    if (this.createdIssueId != 0) {
      data = {
        userName: this.userName,
        userId: this.userId,
        issueId: this.createdIssueId
      }
    }
    else {
      data = {
        userName: this.userName,
        userId: this.userId,
        issueId: this.singleIssueId
      }
    }


    this.hitApis.addAsWatcher(data, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.toastr.success(response['message'])
          this.updateOthers(response['notifyMsg'])

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

  showWatchers = () => {
    if (this.createdIssueId != 0) {
      this.hitApis.listWatchers(this.createdIssueId, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.toastr.success('Here are the watchers.')
            this.watcherData = Object.values(response['data'])

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
    else {
      this.hitApis.listWatchers(this.singleIssueId, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.toastr.success('Here are the watchers.')
            this.watcherData = Object.values(response['data'])

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

  }

  createComment = () => {
    let data
    if (this.createdIssueId != 0) {
      data = {
        username: this.userName,
        issueId: this.createdIssueId,
        comment: this.comment
      }
    }
    else {
      data = {
        username: this.userName,
        issueId: this.singleIssueId,
        comment: this.comment
      }
    }

    this.hitApis.comment(data, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.toastr.success('Comment added.')
          this.allComments = response['data']['allComments']
          this.updateOthers(response['data']['notifyMsg'])

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

  showComments = () => {

    this.hitApis.showAllComments(this.singleIssueId, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {

          this.allComments = response['data']['allComments']


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

  fileChange(event) {
    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];


      this.attachmentString = file
    }
    else {
      this.attachmentString = undefined
    }
  }


  createIssue = () => {
    if (!this.title) {
      this.toastr.warning('Title should be mentioned.')
    }
    else if (!this.htmlContent) {
      this.toastr.warning('Description should be mentioned.')
    }
    else if (!this.assigneeName) {
      this.toastr.warning('Assignee Name should be mentioned.')
    }
    else if (!this.status) {
      this.toastr.warning('Status should be mentioned.')
    }
    else {
      let attachments
      if (this.attachmentString != undefined) {
        attachments = [this.attachmentString]
      }
      else {
        attachments = []
      }

      let data = {
        status: this.status,
        title: this.title,
        attachments: attachments,
        assigneeName: this.assigneeName,
        description: this.htmlContent
      }



      this.hitApis.reportBug(data, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.createdIssueId = response['data'].issueId
            this.toastr.success('New issue created.')
            this.updateOthers(`new issue created by ${this.userId} with title ${response['data'].title}`)

            setTimeout(() => {
              this.createIssueFlag = false
              this.showIssueFlag = true
              this.showissue()

            }, 1000);
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

  }

  setAttachmentFlag = () => {
    this.editAttachmentFlag = true
  }



  setAssigneeFlag = () => {
    this.editAssigneeFlag = true
  }

  updateAssignee = () => {
    let data = {
      username: this.newassigneeName,
      issueId: this.singleIssueId
    }
    this.hitApis.assignIssue(data, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.editAssigneeFlag = false

          this.toastr.success('Assignee updated')
          this.updateOthers(response['data']['notifyMsg'])
          this.showissue()


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

  logout = () => {
    this.hitApis.logout(this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.cookie.remove('authToken')
          this.cookie.remove('userId')
          this.cookie.remove('userName')
          this.hitApis.deleteFromLocalstorage('userDetails')
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


  updateOthers = (msg) => {
    let details
    if (this.createdIssueId != 0) {
      details = {
        msg: msg,
        issueId: this.createdIssueId
      }
    }
    else {
      details = {
        msg: msg,
        issueId: this.singleIssueId
      }
    }

    this.socket.sendNotification(details)
    this.hitApis.saveReporterNotificationHistory(details, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {


        }
        else {

        }
      },
      error => {
        let message = this.hitApis.handleError(error);

      }
    )
    this.hitApis.saveWatcherNotificationHistory(details, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {


        }
        else {

        }
      },
      error => {
        let message = this.hitApis.handleError(error);

      }
    )

  }



  disconnect = () => {
    this.socket.exitSocket()

  }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken')
    this.userName = this.cookie.get('userName')
    this.userId = this.cookie.get('userId')
    let view = this.aroute.snapshot.paramMap.get('view')

    if (view === 'ReportBug') {
      this.createIssueFlag = true
    }
    else {
      this.showIssueFlag = true
      this.singleIssueId = view
      this.showissue()
    }

  }

}
