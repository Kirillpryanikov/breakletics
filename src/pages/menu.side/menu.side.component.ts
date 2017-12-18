import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ItemMenuSide } from '../item.menu.side/item.menu.side';

import {
  SettingsComponent,
  WarmupComponent,
  ExercisesComponent,
  WorkoutComponent,
  ImprintComponent,
  PlusmemberComponent
} from "../index";

import {AgbComponent} from "../agb/agb.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {
  public language;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private iab: InAppBrowser,
              private translate: TranslateService) {}

  ngOnInit(){
      this.language = this.translate.currentLang;
  }

  someMethods(title) {
    this.navCtrl.push(ItemMenuSide , {data: title})
  }

  goTo(page){
    switch (page) {
      case 'PLUSMEMBER': {
        this.modalCtrl.create(PlusmemberComponent).present();
        break;
      }
      case 'MY_ACCOUNT': {
        this.navCtrl.push(SettingsComponent);
        break;
      }
      case 'WorkoutComponent': {
        this.navCtrl.setRoot(WorkoutComponent);
        break;
      }
      case 'ExercisesComponent': {
        this.navCtrl.setRoot(ExercisesComponent);
        break;
      }
      case 'WarmupComponent': {
        this.navCtrl.setRoot(WarmupComponent);
        break;
      }
      case 'AGB': {
        this.navCtrl.push(AgbComponent);
        break;
      }
      case 'IMPRINT': {
        this.navCtrl.push(ImprintComponent);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
  goToLink(url: string) {
    const browser = this.iab.create('url', '_system');
  }

}
