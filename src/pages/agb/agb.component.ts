import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'agb-component',
  templateUrl: 'agb.component.html',
  styleUrls: ['/agb.component.scss']
})
export class AgbComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {}

  ngOnInit(){
  }
}
