import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "../config.service";

@Injectable()
export class DashbordService {

  constructor(public http: HttpClient) {}

  videoWeek(): Observable<any> {
    return this.http.get(`${ConfigService.CONFIG.url}wp/v2/video/week`);
      // .map(res => {
      //   return
      // });
  }
}
