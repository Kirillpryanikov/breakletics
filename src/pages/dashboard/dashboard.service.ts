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
        .map(res => {
          console.log('ERS ______', res);
          if(res && res["metaData"] && res["metaData"].video_url && res["vimeo_data"]) {
            return {
              ID: res["ID"],
              video: res["metaData"].video_url[0].split('https://vimeo.com/')[1],
              title: res["post_title"],
              thumbnail: res["vimeo_data"].pictures.sizes.pop(),
              duration: Math.round(res["vimeo_data"].duration / 60)
            };
          } else {
            return {
              video: '190821442',
              title: res["post_title"],
              thumbnail: {link: '../assets/imgs/workouts-bg.jpg'},
              duration: 15
            };
          }
        })
        .publishReplay(1)
        .refCount();
    }
    return this._videoWeek;
  }
}
