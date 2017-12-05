import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class VideoListService {
  constructor(public http: HttpClient) {}
  private url = `${ConfigService.CONFIG.url}wp/v2/workouts`;

  filter(action, param): Observable<any> {
    return this.http.get(this.url+'?' + action + '=' + param);
  }
  // search(name): Observable<any> {
  //   return this.http.get(this.url+'?level='+name);
  // }
}
