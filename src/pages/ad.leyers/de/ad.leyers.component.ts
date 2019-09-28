import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController, ViewController, Platform} from 'ionic-angular';

@Component({
  selector: 'de-ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class DeADLeyersComponent implements OnInit {
  @Output() showPlus = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private viewCtrl: ViewController) {}

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
