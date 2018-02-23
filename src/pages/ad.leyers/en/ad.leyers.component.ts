import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController, ViewController, Platform } from 'ionic-angular';

@Component({
  selector: 'en-ad-leyers',
  templateUrl: 'ad.leyers.html'
})
export class EnADLeyersComponent implements OnInit {
  @Output() showPlus = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private platform: Platform
              ) {}

  ngOnInit(){
    const that = this;
    this.platform.backButton
      .subscribe(() => {
        that.close();
      })
  }

  plusmember() {
    this.showPlus.emit();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
