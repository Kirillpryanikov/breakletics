import { Component, OnInit } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { ItemMenuSide } from '../item.menu.side/item.menu.side';
import {SettingsComponent} from "../index";

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {}

  ngOnInit(){}

  someMethods(title) {
    this.navCtrl.push(ItemMenuSide , {data: title})
  }

  goTo(page){
    switch (page) {
      case 'MY_ACCOUNT': {
        this.navCtrl.push(SettingsComponent);
      }
    }
  }
}
