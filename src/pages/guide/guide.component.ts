import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides, ViewController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {tryCatch} from "rxjs/util/tryCatch";

@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
  styleUrls: ['/guide.scss',
              '/guide1.scss',
              '/guide2.scss',
              '/guide3.scss',
              '/guide4.scss',
              '/guide5.scss' ]
})
export class GuideComponent implements OnInit{
  @ViewChild('slider') slider: Slides;

  constructor(private navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private viewCtrl: ViewController,
              private navParams: NavParams) {}

  public user: object;

  ngOnInit(){
    this.user = this.navParams.get('user');
    console.log('this.user[\'id\']', this.user);
  }

  ionViewDidEnter() {
    this.slider.lockSwipes(true);
  }

  goNextSlide(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
  }

  guideFinish() {
    console.log('user', this.user, this.user['id']);
    this.nativeStorage.setItem('guide', this.user['id'] )
      .then(res => {
        this.viewCtrl.dismiss();
      })
      .catch(err => {
        console.log('Error Guide component --> ', err);
        this.viewCtrl.dismiss();
      })
  }
}
