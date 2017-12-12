import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ItemMenuSide } from '../item.menu.side/item.menu.side';

import {
  SettingsComponent,
  WarmupComponent,
  ExercisesComponent,
  WorkoutComponent,
  ImprintComponent
} from "../index";
import {AgbComponent} from "../agb/agb.component";

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {
  private user:any;
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private iab: InAppBrowser) {}

  ngOnInit(){

  }

  someMethods(title) {
    this.navCtrl.push(ItemMenuSide , {data: title})
  }

  goTo(page){
    switch (page) {
      case 'MY_ACCOUNT': {
        this.navCtrl.push(SettingsComponent);
        break;
      }
      case 'WorkoutComponent': {
        this.navCtrl.push(WorkoutComponent);
        break;
      }
      case 'ExercisesComponent': {
        this.navCtrl.push(ExercisesComponent);
        break;
      }
      case 'WarmupComponent': {
        this.navCtrl.push(WarmupComponent);
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
