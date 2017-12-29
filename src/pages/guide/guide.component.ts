import {Component, ViewChild, OnInit} from '@angular/core';
import {Slides, ViewController, ModalController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {WrapperVideoPlayerComponent} from "../wrapper.video.player/wrapper.video.player.component";
import {AuthorizationService} from "../../share/authorization.service";

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

  constructor(
              private nativeStorage: NativeStorage,
              private viewCtrl: ViewController,
              private auth: AuthorizationService,
              private modalCtrl: ModalController) {}

  public user: object;

  ngOnInit(){
    this.user = this.auth.user.get();
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
