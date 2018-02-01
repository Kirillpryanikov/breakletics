import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {TranslateService} from "@ngx-translate/core";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import {ConfigService} from "../config.service";

@Injectable()
export class DashbordService {
  _videoWeek: Observable<any> = null;
  public language;
  constructor(public http: HttpClient, private translate: TranslateService) {
    console.log('    this.language = this.translate.currentLang;', this.language );
  }

  videoWeek(): Observable<any> {
    if(!this._videoWeek) {
      this.language = this.translate.currentLang;
      this._videoWeek  = this.http.get(`${ConfigService.CONFIG.url}wp/v2/video/week?language=` + this.language)
        .publishReplay(1)
        .refCount();
    }
    return this._videoWeek;
  }

  randomText(lng){

    if(lng === 'de' || !lng){
      return [
          "NUR PUMBA MACHT HEUT NOCH ZUMBA",
          "DER MUSKELKATER IST DEIN FREUND",
          "FINDE BREAKLETICS KURSE AUF UNSERER WEBSITE",
          "DAS WORKOUT DER WOCHE KANNST DU LIVE AUF UNSERER FACEBOOK SEITE MITTRAINIEREN",
          "STARTE IMMER MIT DEM BEGINNER LEVEL - DIE ÜBUNGEN BAUEN AUF EINANDER AUF",
          "SPULE ZURÜCK, WENN DU ETWAS NICHT VERSTANDEN HAST",
          "NORMALE SQUATS WAREN GESTERN",
          "BREAKLETICS ATHLETEN GIBT ES BEREITS ÜBERALL AUF DER WELT",
          "TRAINIERE MIT DEINEN FREUNDEN – GETEILTES LEID IST HALBES LEID",
          "MIT BREAKLETICS WIRST DU ATHLETISCH UND BEWEGLICH",
          "FOLGE UNS AUF INSTAGRAM FÜR NEUE EXERCISES UND MEHR",
          "SCHÖN, DASS ES DICH GIBT :)"
    ];
    } else {
        return [
            "ONLY PUMBA STILL DOES ZUMBA",
            "SORE MUSCLES ARE YOUR FRIENDS",
            "LOOK FOR BREAKLETICS CLASSES ON OUR WEBSITE",
            "YOU CAN TRAIN THE WORKOUT OF THE WEEK LIVE ON FACEBOOK",
            "ALWAYS START WITH THE “BEGINNER“ LEVEL – THE EXERCISES BUILD ON EACH OTHER",
            "REWIND, IF YOU DID NOT UNDERSTAND AN EXERCISE",
            "NORMAL SQUATS - THAT WAS YESTERDAY",
            "THERE ARE BREAKLETICS ATHLETES ALL OVER THE WORLD",
            "TRAIN WITH YOUR FRIENDS – SUFFERING SHARED IS SUFFERING HALVED",
            "BREAKLETICS MAKES YOU ATHLETICS AND MOBILE",
            "FOLLOW US ON INSTAGRAM FOR NEW EXERCISES AND MORE",
            "WE’RE GLAD, YOU’RE THERE :)"
        ];
    }
  }

  getRundomString(lng){
    lng || 'de'
      console.log('getRundomString getRundomString :: ', lng);
     const arr = this.randomText(lng);
      const nm = Math.floor(Math.random() * arr.length);
      return arr[nm] || '';
  }
}
