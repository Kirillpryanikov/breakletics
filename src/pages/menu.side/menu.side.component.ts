import { Component, OnInit } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';

import { ItemMenuSide } from '../item.menu.side/item.menu.side';
import {
  SettingsComponent,
  WarmupComponent,
  ExercisesComponent,
  WorkoutComponent
} from "../index";

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {
  private user:any;
  constructor(public navCtrl: NavController,
              private navParams: NavParams) {}

  ngOnInit(){

  }

  someMethods(title) {
    this.navCtrl.push(ItemMenuSide , {data: title})
  }

  goTo(page){
    switch (page) {
      case 'MY_ACCOUNT': {
        this.navCtrl.push(SettingsComponent);
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
      default: {
        //statements;
        break;
      }
    }
  }

}
