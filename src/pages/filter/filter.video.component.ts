import { Component, OnInit } from '@angular/core';
import {NavController, ModalController, LoadingController, NavParams, ViewController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'filter-video',
  templateUrl: 'filter.video.component.html',
  styleUrls: ['/filter.scss']
})
export class FilterVideoComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private viewCtrl: ViewController,) {}

  ngOnInit(){}

  close() {
    this.viewCtrl.dismiss();
  }
}
