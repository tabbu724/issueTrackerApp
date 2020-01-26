import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public authToken
  public userName
  public userId
  public issueInfo
  public resultsAvailable
  public searchString
  public filterText
  public ftitle
  public fdate
  public freporter
  public fstatus
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

  viewSearchResult = () => {
    this.hitApis.search(this.authToken).subscribe(
      response => {
        if (response['status'] == 200) {
          this.resultsAvailable = true
          this.formatDate(response)

          this.issueInfo = response['data']
        }
        else {
          this.resultsAvailable = false
          this.toastr.error(response['message']);
        }
      },
      error => {
        this.resultsAvailable = false
        let message = this.hitApis.handleError(error);
        this.toastr.error(message)
      }
    )
  }

  sortByTitle = () => {
    let values = {
      status: false,
      creationDate: false,
      reporterId: false,
      title: true
    }
    this.hitApis.sortSearch(values, this.authToken).subscribe(
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
    this.hitApis.sortSearch(values, this.authToken).subscribe(
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
    this.hitApis.sortSearch(values, this.authToken).subscribe(
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
    this.hitApis.sortSearch(values, this.authToken).subscribe(
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
    this.fdate = false
    this.freporter = false
    this.fstatus = false

  }

  filterIssues = () => {
    if (this.ftitle == true) {
      this.hitApis.filterRowsByTitleSearchView(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.ftitle = false
            this.filterText = ''
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
      this.hitApis.filterRowsByStatusSearchView(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.fstatus = false
            this.filterText = ''
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

      this.hitApis.filterRowsByDateSearchView(dateToSearch, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.formatDate(response)
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
      this.hitApis.filterRowsByReporterIdSearchView(this.filterText, this.authToken).subscribe(
        response => {
          if (response['status'] == 200) {
            this.freporter = false
            this.filterText = ''
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
    this.fdate = false
    this.freporter = false

  }

  filterbydate = () => {

    this.fdate = true
    this.fstatus = false
    this.ftitle = false
    this.freporter = false
  }

  setShowIssueFlag=()=>{
    console.log('show issue set by dashboard');
    
    // this.showIssueFlag=true
    this.hitApis.receiveIssueDescriptionFlags('showIssueFlag')
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
    this.userName = this.cookie.get('userName')
    this.userId = this.cookie.get('userId')
    this.authToken = this.cookie.get('authToken')
    this.searchString=this.hitApis.sendSearchString()
    this.viewSearchResult()
  }

}
