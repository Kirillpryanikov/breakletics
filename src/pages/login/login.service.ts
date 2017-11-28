import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "../config.service";
import { NativeStorage } from '@ionic-native/native-storage';


@Injectable()
export class LoginService {

  constructor(public http: HttpClient, private nativeStorage: NativeStorage,) {}

  login(data): Observable<any> {
    return this.http.post(`${ConfigService.CONFIG.url}jwt-auth/v1/token`, data)
  }
}
