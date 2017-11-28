import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ExtraQuestionsService {

  constructor(public http: HttpClient) {}

  updateUser(data): Observable<any> {
    return this.http.put(`http://bl-members-dev.yelpix.work/members/wp-json/wp/v2/users/${data.user_id}`, data)
      .catch(err =>  Observable.throw(err.json() || 'Server error'))
  }
}
