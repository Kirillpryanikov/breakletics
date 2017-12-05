import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NavController, ModalController, LoadingController, NavParams, ViewController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'filter-video',
  templateUrl: 'filter.video.component.html',
  styleUrls: ['/filter.scss']
})
export class FilterVideoComponent implements OnInit {

  @ViewChild('containerFilters') containerFilters: ElementRef;

  protected filters = {
    workouts: [],
    exercises: [],
    warmups_cooldown: []
  };

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

  setFilter(filter, value) {
    let isExist = undefined;
    this.filters[filter].forEach((f, index) => {
      if(f === value) {
        isExist = index + 1;
        return;
      }
    });
    if(!isExist) {
      this.filters[filter].push(value);
    } else {
      delete this.filters[filter][isExist - 1];
    }
  }

  getFilters() {
    this.containerFilters.nativeElement.querySelectorAll('.')
  }
}
