import { Component, OnInit  } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['/account.scss']
})
export class AccountComponent implements OnInit {
  private user: any;
  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
    this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        console.log('User:: ',res);
      })
      .catch(err => {
        this.user = this.navParams.get('user');
        console.log('User:: err ',err);
      });
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }
}
