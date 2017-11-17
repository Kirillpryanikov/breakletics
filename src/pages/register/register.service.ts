import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegisterService {
  public header: HttpHeaders = new HttpHeaders();

  constructor(public http: HttpClient) {}

  registration(data): Observable<any> {
      return this.http.post('http://bl-members-dev.yelpix.work/members/wp-json/wp/v2/users/register', data)
  }
}
