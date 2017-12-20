import { Component, OnInit } from '@angular/core';
import {App, NavController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberService} from "./plusmember.service";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
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
              private viewCtrl: ViewController,
              private translate: TranslateService,
              private service: PlusmemberService,
              private launchNavigator: LaunchNavigator,
              private iab: InAppBrowser,
  ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;

    console.log('this.language',this.language);
      this.testimonials = this.service.testimonials(this.language);
      this.benefits = this.service.benefits(this.language);
  }

  goToLink(url) {
    console.log('url', url);
    // const browser = this.iab.create(url, '_system');
  }
}
