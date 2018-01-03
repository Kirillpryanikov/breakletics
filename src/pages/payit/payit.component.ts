import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../config.service";
import { ModalController } from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {PlusmemberComponent} from "../plusmember/plusmember.component";

@Component({
  selector: 'pay-it',
  templateUrl: 'payit.html',
  styleUrls: ['/payit.scss']
})

export class PayItComponent implements OnInit {
  public language;
  constructor(
    // private translate: TranslateService,
    private modalCtrl: ModalController,
    private iab: InAppBrowser
  ) {}

  ngOnInit(){
    // this.language = this.translate.currentLang;
  }
  pay() {
    this.modalCtrl.create(PlusmemberComponent).present();
    // const browser = this.iab.create(ConfigService.CONFIG.payUrl, '_system');
  }
}
