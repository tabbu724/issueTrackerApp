import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public username;
  public email;
  public password;
  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }

  public signIn = () => {
    let credentials = {
      "username": this.username,
      "email": this.email,
      "password": this.password,

    };
    if (!this.username) {
      return this.toastr.warning('Username is missing')
    }
    else if (!this.email) {
      return this.toastr.warning('Email id is missing')
    }
    else if (!this.password) {
      return this.toastr.warning('Password missing');
    }
    else {

      this.hitApis.userSignup(credentials).subscribe(
        response => {
          if (response['status'] == 200) {
            this.hitApis.setLocalStorage(response['data']['userDetails']);
            this.toastr.success('You have successfully signed in.');
            setTimeout(() => {
              this._router.navigate(['/dashboard']);
            }, 2000);
          }
          else {
            this.toastr.error(response['message']);
          }
        },
        error => {
          let message = this.hitApis.handleError(error);
          this.toastr.error(message)

        }
      );
    }

  }

  ngOnInit() {
  }

}
