import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";

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

  aplly() {
    this.viewCtrl.dismiss();
  }
}
