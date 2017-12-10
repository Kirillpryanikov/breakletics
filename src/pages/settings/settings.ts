import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {AccountComponent} from "../account/account.component";

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
  styleUrls: ['/settings.scss']
})
export class SettingsComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }
  goTo(page){
    switch (page) {
      case 'MY_ACCOUNT': {
        this.navCtrl.push(AccountComponent);
      }
    }
  }
  aplly() {
    this.viewCtrl.dismiss();
  }
}
