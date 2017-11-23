import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "../config.service";

@Injectable()
export class DashbordService {

  constructor(public http: HttpClient) {}

  videoWeek(): Observable<any> {
    return this.http.get(`${ConfigService.CONFIG.url}wp/v2/video/week`)
      .map(res => {
        console.log('res :::::::  ', res)
        if(res && res["metaData"] && res["metaData"].video_url)
          return {
            ID: res["ID"],
            video: res["metaData"].video_url[0],
            title: res["post_title"]
          };
      });
  }
}
