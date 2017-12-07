import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

import "rxjs/add/operator/do";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private newReq: any;

  constructor(private nativeStorage: NativeStorage) {
  }

  getUser(cb) {
    this.nativeStorage.getItem('user')
      .then(res => {
        cb(res);
      })
      .catch(err => {
        cb(err);
      });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // this.getUser(function (res) {
    //   console.log('user :: ', res);
    //   this.newReq = req.clone({
    //     headers: req.headers.set('Authorization', res.token)
    //   });
    // });
    //
    console.log('REQ :: ', req);
    return next
      .handle(req)
      .do(
        succ => console.log('succ',succ),
        err => console.log('err', err)
    );
  }
}
