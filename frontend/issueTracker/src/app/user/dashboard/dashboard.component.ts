import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";
import * as $ from 'jquery';

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
public fstatus
public fdate
public freporter

  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) {
    
   }

  viewDashboard=()=>{
    this.hitApis.dashboardInfo(this.authToken).subscribe(
    response=>{
      if (response['status'] == 200) {
        this.issueInfo=response['data']
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

  setSearchText=()=>{
    if(!this.searchText){
      this.toastr.warning('Search field cannot be empty.')
    }
    else{
      this.hitApis.supplySearchString(this.searchText)
      this.toastr.success('Finding your results.Please wait...');
            setTimeout(() => {
              this._router.navigate(['/search']);
            }, 1000);
    }

  }

  sortByTitle=()=>{
    let values={
      status:false,
      creationDate:false,
      reporterId:false,
      title:true
    }
    this.hitApis.sortByColumns(values,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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
  sortByStatus=()=>{
    let values={
      status:true,
      creationDate:false,
      reporterId:false,
      title:false
    }
    this.hitApis.sortByColumns(values,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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
  sortByReporter=()=>{
    let values={
      status:false,
      creationDate:false,
      reporterId:true,
      title:false
    }
    this.hitApis.sortByColumns(values,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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
  sortByDate=()=>{
    let values={
      status:false,
      creationDate:true,
      reporterId:false,
      title:false
    }
    this.hitApis.sortByColumns(values,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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

filterbytitle=()=>{
  
  this.ftitle=true
 
}

filterIssues=()=>{
  if(this.ftitle==true){
    this.hitApis.filterRowsByTitle(this.filterText,this.authToken).subscribe(
          response=>{
            if (response['status'] == 200) {
              this.issueInfo=response['data']
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
  else if(this.fstatus){
    this.hitApis.filterRowsByStatus(this.filterText,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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
  else if(this.fdate){
    this.hitApis.filterRowsByDate(this.filterText,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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
  else if(this.freporter){
    this.hitApis.filterRowsByReporterId(this.filterText,this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.issueInfo=response['data']
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


filterbystatus=()=>{
 
  this.fstatus=true}

  filterbydate=()=>{
 
    this.fdate=true}

    filterbyreporter=()=>{
 
      this.freporter=true}

  logout=()=>{
    this.hitApis.logout(this.authToken).subscribe(
      response=>{
        if (response['status'] == 200) {
          this.toastr.success('Successfully logged out.')
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
  
  show=(issueId)=>{
    console.log('issueId',issueId);
    this.hitApis.getIssueId(issueId)
    this.toastr.success('Fetching Details.Please wait...');
            setTimeout(() => {
              this._router.navigate(['/issueDescription']);
            }, 1000);
  }
  ngOnInit() {
    this.userName=this.cookie.get('userName')
this.userId=this.cookie.get('userId')
this.authToken=this.cookie.get('authToken')
this.viewDashboard()
  }

}
