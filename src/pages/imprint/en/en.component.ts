import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'en-imprint',
  templateUrl: 'en.html',
  styleUrls: ['/en.scss']
})
export class EnImprintComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}
  ngOnInit(){
  }
}
