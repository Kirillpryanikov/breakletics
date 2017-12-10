import { Component, OnInit  } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";

@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['/account.scss']
})
export class AccountComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }
}
