import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post('http://bl-members-dev.yelpix.work/members/wp-json/jwt-auth/v1/token', data)
  }
}
