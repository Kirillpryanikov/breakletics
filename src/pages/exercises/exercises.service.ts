import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class ExercisesService {
  constructor(public http: HttpClient) {}

  exercises(): Observable<any> {
    return this.http.get(`${ConfigService.CONFIG.url}wp/v2/exercises`);
  }
}
