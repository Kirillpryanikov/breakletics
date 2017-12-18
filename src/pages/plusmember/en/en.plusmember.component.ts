import { Component, OnInit, Input } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'en-plusmember',
  templateUrl: 'en.plusmember.html',
  styleUrls: ['/en.plusmember.scss']
})
export class EnPlusmemberComponent implements OnInit {
  @Input() testimonials: any[];
  @Input() benefits: any[];
  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
