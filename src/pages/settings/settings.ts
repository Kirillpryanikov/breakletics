import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {AccountComponent} from "../account/account.component";
import {User} from "../../share/User";
import {AuthorizationService} from "../../share/authorization.service";
import {ConfigService} from "../config.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
  styleUrls: ['/settings.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private auth: AuthorizationService,
              private iab: InAppBrowser) {}

  ngOnInit(){
    this.user = this.auth.user.get();
    console.log('this.user', this.user);
  }
  pay() {
    const browser = this.iab.create(ConfigService.CONFIG.payUrl, '_system');
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
