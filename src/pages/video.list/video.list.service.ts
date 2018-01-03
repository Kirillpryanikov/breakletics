import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class VideoListService {
  constructor(public http: HttpClient) {}

  workouts(params): Observable<any> {
    let url = `${ConfigService.CONFIG.url}wp/v2/workouts`;
    return this.http.post(url, params);
  }

  warmup(params): Observable<any> {
    let url = `${ConfigService.CONFIG.url}wp/v2/warmups`;
    return this.http.post(url, params);
  }

  exercises(params): Observable<any> {
    let url = `${ConfigService.CONFIG.url}wp/v2/exercises`;
    return this.http.post(url, params)
  }

}
