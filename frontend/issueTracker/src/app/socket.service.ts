import { Injectable } from '@angular/core';
import { HttpParams,HttpErrorResponse,HttpClient } from "@angular/common/http";
import io  from "socket.io-client";
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private authToken=this.cookie.get('authToken');
  private userId=this.cookie.get('userId');
  private socket;
  constructor(private http:HttpClient,private cookie:CookieService) {
    // initial connection setup through handshake
    this.socket = io(this.url);
  }

  // events to listen

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', () => {
        observer.next('user verify event listened.');
      });//end socket
    });//end observable
  }//end verifyUser

  public makeUserOnline = () => {
    return Observable.create((observer) => {
      this.socket.on('online-status', (msg) => {
        observer.next(msg);
      });//end socket
    });//end observable
  }//end onlineUserList

  public disconnect = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }

  public receiveNotifications = (receiverUserId) => {
    return Observable.create((observer) => {
      this.socket.on(receiverUserId, (info) => {
        observer.next(info);
      });
    });
  }

  // events to emit

  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }

  public sendNotification = (updatedDetails) => {
    this.socket.emit('chat-msg', updatedDetails);
  }

  public exitSocket=()=>{
    this.socket.disconnect();
  }

// api requests

public getPrevChat=(senderId,receiverId,skip)=>{
  return this.http.get(`${this.url}/api/v1/chat/get/for/user`,
  {params:{senderId:senderId,receiverId:receiverId,skip:skip,authToken:this.cookie.get('authToken')}}
  )

}



public logout=()=>{
  return this.http.post(`${this.url}/api/v1/users/logout?authToken=${this.authToken}`,this.userId);
}

  //error handler

  public errorHandler = (err: HttpErrorResponse) => {
    let errMessage = '';
    if (err.error instanceof Error) {
      errMessage = `An error occurred ${err.error.message}`;
    }
    else {
      errMessage = `Server returned the code: ${err.status} with error mesaage : ${err.message}`;
    }
    console.error(errMessage);
    return Observable.throw(errMessage);
  }//end error handler

}
