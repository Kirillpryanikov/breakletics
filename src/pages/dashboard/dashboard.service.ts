import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class DashbordService {
  _videoWeek: Observable<any> = null;

  constructor(public http: HttpClient) {}

  videoWeek(): Observable<any> {
    if(!this._videoWeek) {
      this._videoWeek  = this.http.get(`${ConfigService.CONFIG.url}wp/v2/video/week`)
        .publishReplay(1)
        .refCount();
    }
    return this._videoWeek;
  }
}
