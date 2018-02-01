import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class ExercisesService {
  constructor(public http: HttpClient,
              private translate: TranslateService) {}

  exercises(): Observable<any> {
    let params = { language: this.translate.currentLang };
    return this.http.post(`${ConfigService.CONFIG.url}wp/v2/exercises`, params);
  }
}
