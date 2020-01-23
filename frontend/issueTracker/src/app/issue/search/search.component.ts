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
public searchInfo
  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) {
    
  }

 viewSearchResult=()=>{
   this.hitApis.search(this.authToken).subscribe(
   response=>{
     if (response['status'] == 200) {
       this.searchInfo=response['data']
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



  ngOnInit() {
    this.userName=this.cookie.get('userName')
this.userId=this.cookie.get('userId')
this.authToken=this.cookie.get('authToken')
    this.viewSearchResult()
  }

}
