import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "./../pages/config.service";
import {User} from './User';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AuthorizationService {
  private _user: User;
  constructor(public http: HttpClient, private nativeStorage: NativeStorage,) {
  }

  login(data): Observable<any> {
    return this.http.post(`${ConfigService.CONFIG.url}jwt-auth/v1/token`, data).map(res=>{
      this.session.start(res);
      return res;
    })
  }

  user = {
    that: this,
    get(){
      if(this.that._user) {
        return this.that._user;
      }
      this.that.nativeStorage.getItem('user')
        .then(res => {
          this.that._user = res;
          return res;
        })
        .catch(err => {
        });
    },
    set(data):Observable<any>{
      return this.that.http.post(`${ConfigService.CONFIG.url}wp/v2/users/register`, data)
    },
    update(data):Observable<any>{
      return this.that.http.post(`${ConfigService.CONFIG.url}wp/v2/users/meta`, data).map(res=>{
        // this.session.start(res);
        return res;
      })
        .catch(err =>  Observable.throw(err.json() || 'Server error'))
    }
  };

  session = {
    that: this,
    start(user){
      this.that._user = user;
      this.that.nativeStorage.setItem('user', user);
    }
  }

}
