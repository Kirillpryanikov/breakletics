import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberService} from "./plusmember.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
  selector: 'plusmember',
  templateUrl: 'plusmember.html',
  styleUrls: ['/plusmember.scss']
})
export class PlusmemberComponent implements OnInit {
  public language: string;
  public testimonials: any;
  public benefits: any;

  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              private service: PlusmemberService,
              private iab: InAppBrowser
  ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
    this.testimonials = this.service.testimonials(this.language);
    this.benefits = this.service.benefits(this.language);
  }

  goToLink(url: string) {
    const browser = this.iab.create('url', '_system');
  }
}
