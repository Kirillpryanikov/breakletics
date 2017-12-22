import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {AccountComponent} from "../account/account.component";
import {User} from "../../share/User";
import {AuthorizationService} from "../../share/authorization.service";

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
              private auth: AuthorizationService) {}

  ngOnInit(){
    this.user = this.auth.user.get();
    console.log('this.user', this.user);
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
