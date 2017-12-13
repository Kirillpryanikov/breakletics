import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class ADLeyersComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
