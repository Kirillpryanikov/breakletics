import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "../config.service";

@Injectable()
export class RegisterService {
  public header: HttpHeaders = new HttpHeaders();

  constructor(public http: HttpClient) {}

  registration(data): Observable<any> {
      return this.http.post(`${ConfigService.CONFIG.url}wp/v2/users/register`, data)
  }
}
