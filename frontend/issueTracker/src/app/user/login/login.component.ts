import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usernameEmail;
  public user_password;
  constructor(private hitApis: ApiService, private toastr: ToastrService, private _router: Router, private cookie: CookieService) { }

  public logIn = () => {
    let credentials = {
      "usernameEmail": this.usernameEmail,
      "password": this.user_password
    };
    if (!this.usernameEmail) {
      return this.toastr.warning('Email id/username is missing')
    }
    else if (!this.user_password) {
      return this.toastr.warning('Password missing');
    }
    else {
      this.hitApis.userLogin(credentials).subscribe(
        response => {
          if (response['status'] == 200) {
            this.hitApis.setLocalStorage(response['data']['userDetails']);
            this.cookie.put('authToken', response['data']['authToken']);
            this.cookie.put('userId', response['data']['userDetails']['userId']);
            this.cookie.put('userName', `${response['data']['userDetails']['userName']} `);
            console.log(response['data']);
            this.toastr.success('Login Successfull');
            setTimeout(() => {
              this._router.navigate(['/dashboard']);
            }, 2000);
          }
          else {
            this.toastr.error( response['message']);
          }
        },
        error => {
          let message = this.hitApis.handleError(error);
          this.toastr.error(message)
          // if(message == "Http failure response for https://chatapi.edwisor.com/api/v1/users/login: 400 Bad Request")
          // this.toastr.error('Either Email or password is incorrect');
        }
      );
    }

  }

  public loginViaFb = () => {
    this.hitApis.userLoginFb().subscribe(
      response => {
        if (response['status'] == 200) {
          console.log(response);

          this.hitApis.setLocalStorage(response['data'])
          this.toastr.success('Login Successfull')
          setTimeout(() => {
            this._router.navigate(['/dashboard']);
          }, 2000);
        }
        else {
          this.toastr.error(response['message']);

        }

      },
      error => {
        this.toastr.error('Error occurred.', error)
      }
    )
  }

  ngOnInit() {
  }

}
