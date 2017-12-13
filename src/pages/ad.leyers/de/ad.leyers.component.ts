import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'de-ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class DeADLeyersComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
