import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';


import {ConfigService} from "../config.service";

@Injectable()
export class WarmupService {
  constructor(public http: HttpClient,
              private translate: TranslateService) {}

  warmups(): Observable<any> {
    let params = { language: this.translate.currentLang };
    return this.http.post(`${ConfigService.CONFIG.url}wp/v2/warmups`, params);
  }
}
