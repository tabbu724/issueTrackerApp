import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userName
  public userId
  public authToken
  public issueInfo
  public searchText
  public filterText
  public ftitle
  public fdate
  public freporter
  public fstatus
  public createIssueFlag = false
  public showIssueFlag = false
  public notifyFlag = false
  public notify
  public page = 1
  constructor(private hitApis: ApiService, private socket: SocketService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) {

  }



  viewDashboard = () => {
    this.notifyFlag = false
    this.hitApis.dashboardInfo(this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {



          this.issueInfo = response['data']
          this.verifyUser()
          this.makeUserOnline()
          this.receiveNotifications()
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

  setSearchText = () => {
    if (!this.searchText) {
      this.toastr.warning('Search field cannot be empty.')
    }
    else {
      this.toastr.success('Finding your results.Please wait...');
      setTimeout(() => {
        this._router.navigate(['/search', this.searchText]);
      }, 1000);
    }

  }

  sortByTitle = () => {
    let values = {
      status: false,
      creationDate: false,
      reporterId: false,
      title: true
    }
    this.hitApis.sortByColumns(values, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.issueInfo = response['data']
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
  sortByStatus = () => {
    let values = {
      status: true,
      creationDate: false,
      reporterId: false,
      title: false
    }
    this.hitApis.sortByColumns(values, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.issueInfo = response['data']
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
  sortByReporter = () => {
    let values = {
      status: false,
      creationDate: false,
      reporterId: true,
      title: false
    }
    this.hitApis.sortByColumns(values, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {

          this.issueInfo = response['data']
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
  sortByDate = () => {
    let values = {
      status: false,
      creationDate: true,
      reporterId: false,
      title: false
    }
    this.hitApis.sortByColumns(values, this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {

          this.issueInfo = response['data']
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

  filterbytitle = () => {

    this.ftitle = true
    this.fdate = false
    this.freporter = false
    this.fstatus = false

  }

  filterIssues = () => {
    if (this.ftitle == true) {
      this.hitApis.filterRowsByTitle(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.ftitle = false
            this.filterText = ''
            this.toastr.success('Filtered the data for you.');

            this.issueInfo = response['data']
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
    else if (this.fstatus) {
      this.hitApis.filterRowsByStatus(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.fstatus = false
            this.filterText = ''
            this.toastr.success('Filtered the data for you.');

            this.issueInfo = response['data']
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
    else if (this.fdate) {
      let dateToSearch = this.filterText

      this.hitApis.filterRowsByDate(dateToSearch, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.fdate = false
            this.filterText = ''
            this.toastr.success('Filtered the data for you.');
            this.issueInfo = response['data']

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
    else if (this.freporter) {
      this.hitApis.filterRowsByReporterId(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.freporter = false
            this.filterText = ''
            this.toastr.success('Filtered the data for you.');
            this.issueInfo = response['data']
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


  filterbystatus = () => {

    this.fstatus = true
    this.ftitle = false
    this.fdate = false
    this.freporter = false

  }

  filterbydate = () => {

    this.fdate = true
    this.fstatus = false
    this.ftitle = false
    this.freporter = false
  }

  filterbyreporter = () => {

    this.freporter = true
    this.fdate = false
    this.fstatus = false
    this.ftitle = false
  }

  close = () => {
    if (this.ftitle) {
      this.ftitle = false
    }
    else if (this.fstatus) {
      this.fstatus = false
    }
    else if (this.freporter) {
      this.freporter = false
    }
    else if (this.fdate) {
      this.fdate = false
    }
  }

  setCreateIssueFlag = () => {

    setTimeout(() => {
      this._router.navigate(['/issueDescription', 'ReportBug']);
    }, 1000);
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

  show = (issueId) => {

    this.toastr.success('Fetching Details.Please wait...');
    setTimeout(() => {
      this._router.navigate(['/issueDescription', issueId]);
    }, 1000);
  }

  // socket related

  verifyUser = () => {
    this.socket.verifyUser().subscribe(
      (data) => {
        this.socket.setUser(this.authToken);
        this.receiveError()

      },
      (err) => {
        this.socket.errorHandler(err);
      }
    )
  }

  receiveError = () => {
    this.socket.receiveError().subscribe(
      (data) => {
        this.toastr.warning(data)
      },
      (err) => {
        this.socket.errorHandler(err);
      }
    )
  }

  makeUserOnline = () => {
    this.socket.makeUserOnline().subscribe(
      (data) => {
      },
      (err) => {
        this.socket.errorHandler(err);
      }
    )
  }

  receiveNotifications = () => {
    this.socket.receiveNotifications(this.userId).subscribe(
      (data) => {
        this.toastr.info(data.msg, 'notification')
      },
      (err) => {
        this.socket.errorHandler(err);
      }
    )
  }

  notificationHistory = () => {
    this.hitApis.notificationHistory(this.authToken, this.userId).subscribe(
      response => {
        if (response['status'] == 200) {
          this.notifyFlag = true
          this.toastr.success('Getting your notification history')
          this.notify = response['data']
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

  goToIssue = (issueId) => {
    setTimeout(() => {
      this._router.navigate(['/issueDescription', issueId]);
    }, 1000);
  }

  disconnect = () => {
    this.socket.exitSocket()

  }

  ngOnInit() {
    this.userName = this.cookie.get('userName')
    this.userId = this.cookie.get('userId')
    this.authToken = this.cookie.get('authToken')
    this.viewDashboard()
  }

}
