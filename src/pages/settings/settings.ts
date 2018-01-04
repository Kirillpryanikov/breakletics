import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {AccountComponent} from "../account/account.component";
import {User} from "../../share/User";
import {AuthorizationService} from "../../share/authorization.service";
import {ConfigService} from "../config.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {PlusmemberComponent} from "../plusmember/plusmember.component";

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
              private iab: InAppBrowser,
              private modalCtrl: ModalController) {}

  ngOnInit(){
    this.user = this.auth.user.get();
    console.log('this.user', this.user);
  }

  pay() {
    // const browser = this.iab.create(ConfigService.CONFIG.payUrl, '_system');
    this.modalCtrl.create(PlusmemberComponent).present();

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
