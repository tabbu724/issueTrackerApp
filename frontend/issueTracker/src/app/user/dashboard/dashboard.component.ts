import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
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
  public createIssueFlag=false
  public showIssueFlag=false
  public page = 1
  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) {

  }

formatDate=(response)=>{
  for (let data of response['data']) {
    let formattedDate = new Date(data['creationDate']).toDateString()
    let formattedTime = new Date(data['creationDate']).toLocaleTimeString()
    let displayDate = `${formattedDate} , ${formattedTime}`
    let index = response['data'].indexOf(data)
    response['data'][index]['creationDateString'] = displayDate
  }
}

  viewDashboard = () => {
    this.hitApis.dashboardInfo(this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          
          this.formatDate(response)

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

  setSearchText = () => {
    if (!this.searchText) {
      this.toastr.warning('Search field cannot be empty.')
    }
    else {
      this.hitApis.supplySearchString(this.searchText)
      this.toastr.success('Finding your results.Please wait...');
      setTimeout(() => {
        this._router.navigate(['/search']);
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
          this.formatDate(response)
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
          this.formatDate(response)
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
          this.formatDate(response)
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
          this.formatDate(response)
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
    this.fdate=false
this.freporter=false
this.fstatus=false

  }

  filterIssues = () => {
    if (this.ftitle == true) {
      this.hitApis.filterRowsByTitle(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.ftitle = false
            this.filterText=''
            this.toastr.success('Filtered the data for you.');
            this.formatDate(response)
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
            this.filterText=''
            this.toastr.success('Filtered the data for you.');
            this.formatDate(response)
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
      // console.log(dateToSearch);

      this.hitApis.filterRowsByDate(dateToSearch, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.formatDate(response)
            this.fdate = false
            this.filterText=''
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
            this.filterText=''
            this.toastr.success('Filtered the data for you.');
            this.formatDate(response)
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
    this.fdate=false
this.freporter=false

  }

  filterbydate = () => {

    this.fdate = true
    this.fstatus = false
    this.ftitle = false
this.freporter=false
  }

  filterbyreporter = () => {

    this.freporter = true
    this.fdate = false
    this.fstatus = false
    this.ftitle = false
  }

close=()=>{
  if(this.ftitle){
    this.ftitle=false
  }
  else if(this.fstatus){
    this.fstatus=false
  }
  else if(this.freporter){
    this.freporter=false
  }
  else if(this.fdate){
    this.fdate=false
  }
}

setCreateIssueFlag=()=>{
  this.createIssueFlag=true
this.hitApis.receiveIssueDescriptionFlags('createIssueFlag',this.createIssueFlag)
setTimeout(() => {
  this._router.navigate(['/issueDescription']);
}, 1000);
}


setShowIssueFlag=()=>{
  this.showIssueFlag=true
  this.hitApis.receiveIssueDescriptionFlags('showIssueFlag',this.showIssueFlag)
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

  show = (issueId) => {
    // console.log('issueId', issueId);
    this.hitApis.getIssueId(issueId)
    this.setShowIssueFlag()
    this.toastr.success('Fetching Details.Please wait...');
    setTimeout(() => {
      this._router.navigate(['/issueDescription']);
    }, 1000);
  }
  ngOnInit() {
    this.userName = this.cookie.get('userName')
    this.userId = this.cookie.get('userId')
    this.authToken = this.cookie.get('authToken')
    this.viewDashboard()
  }

}
