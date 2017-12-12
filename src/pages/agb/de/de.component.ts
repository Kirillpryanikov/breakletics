import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'de-agb',
  templateUrl: 'de.html',
  styleUrls: ['/de.scss']
})
export class DeAgbComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
  }
}
