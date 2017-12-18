import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'de-ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class DeADLeyersComponent implements OnInit {
  @Output() showPlus = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  plusmember() {
    this.showPlus.emit();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
