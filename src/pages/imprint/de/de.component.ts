import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'de-imprint',
  templateUrl: 'de.html',
  styleUrls: ['/de.scss']
})
export class DeImprintComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
  }
}
