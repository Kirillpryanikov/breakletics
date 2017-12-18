import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../config.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
  selector: 'pay-it',
  templateUrl: 'payit.html',
  styleUrls: ['/payit.scss']
})

export class PayItComponent implements OnInit {
  public language;
  constructor(
    // private translate: TranslateService,
    private iab: InAppBrowser
  ) {}

  ngOnInit(){
    // this.language = this.translate.currentLang;
  }
  pay() {
    const browser = this.iab.create(ConfigService.CONFIG.payUrl, '_system');
  }
}
