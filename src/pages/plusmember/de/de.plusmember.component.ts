import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'de-plusmember',
  templateUrl: 'de.plusmember.html',
  styleUrls: ['/de.plusmember.scss']
})
export class DePlusmemberComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
