import { Component, ViewChild, OnInit, Output } from '@angular/core';
import {NavController, Slides, ViewController, NavParams, ModalController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {tryCatch} from "rxjs/util/tryCatch";
import {WrapperVideoPlayerComponent} from "../wrapper.video.player/wrapper.video.player.component";

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

  public firstName: string;

  constructor(private navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private modalCtrl: ModalController) {}

  public user: object;

  ngOnInit(){
    this.user = this.navParams.get('user');
    console.log('this.user:::  ', this.user);
    if(this.user) {
      this.firstName = this.user['user_display_name'].split(' ')[0];
    }
  }


  ionViewDidEnter() {
    this.slider.lockSwipes(true);
  }

  goNextSlide(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
  }

  guideFinish() {
    this.nativeStorage.setItem('guide', this.user? this.user['id']: true)
      .then(res => {
        this.viewCtrl.dismiss();
      })
      .catch(err => {
        this.viewCtrl.dismiss();
      })
  }

  workoutPlusWarmup(){
    this.playVideoModal({video_url:'https://vimeo.com/247622460'});
    this.guideFinish();
  }

  workout(){
    this.playVideoModal({ video_url: 'https://vimeo.com/247691009'});
    this.guideFinish();
  }
  playVideoModal(url) {
    this.modalCtrl.create(WrapperVideoPlayerComponent, {video: url}).present();
  }
}
