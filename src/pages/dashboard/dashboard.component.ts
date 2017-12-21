import {Component, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {NavController, ModalController, LoadingController, NavParams, Platform, ViewController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {TranslateService} from "@ngx-translate/core";

import { GuideComponent, PlusmemberComponent, WrapperVideoPlayerComponent, WorkoutComponent, WelcomePageComponent, ExercisesComponent, WarmupComponent } from '../';
import { DashbordService } from './dashboard.service';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  private loading: any;
  public user: object;
  public video: any;
  public heightDevice: number;
  public weightDevice: number;
  private videoWeekObservable: Subscription;
  public isScroll = false;
  public rundStr;
  public language;

  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: DashbordService,
              private viewCtrl: ViewController,
              private platform: Platform,
              ) {
    // this.loading = this.loadingCtrl.create({
    // });
  }

  ngOnInit(){
    this.weightDevice = this.platform.width();
    this.heightDevice = this.platform.height()* 29.5 / 100;
    this.getUser();
    this.handlerLoadVideo();
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.language = this.translate.currentLang;
      this.rundStr = this.service.getRundomString(this.translate.currentLang);
    },2000);

    this.language = this.translate.currentLang;
    this.rundStr = this.service.getRundomString(this.translate.currentLang);

  }

  presentLoading(){
      if(!this.loading){
          this.loading = this.loadingCtrl.create({
              spinner: 'crescent',
              duration: 3000
          });
          this.loading.present();
      }
  }

  dismissLoading() {
      if (this.loading) {
          try {
              this.loading.dismiss();
          }
          catch (exception) {
              console.log(exception);
          }
          this.loading = null;
      }
  }

  /**
   * get user from storage
   */
  getUser() {
      this.presentLoading();
      this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        this.presentGuideModal(this.user);
        this.dismissLoading();
      })
      .catch(err => {
        this.user = this.navParams.get('user');
        this.presentGuideModal(this.user);
        this.dismissLoading();
      });
  }

  handlerLoadVideo() {
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.video = res;
    }, err => {
      console.log('err video::: ', err);
    });
  }

  logout() {
    this.loading.present();

    this.nativeStorage.remove('user')
      .then(res => {
        this.navCtrl.setRoot(WelcomePageComponent);
        this.loading.dismiss();
      })
      .catch(err => {
        this.loading.dismiss();
      })
  }

  playVideoModal() {
    if(this.video.video_url) {
      this.modalCtrl.create(WrapperVideoPlayerComponent, {video: this.video}).present();
    }
  }

  presentGuideModal(user) {
    let guide;
    this.nativeStorage.getItem('guide')
      .then(res => {
        if(!res || res !== this.user['id']) {
          this.isScroll = true;
          guide = this.modalCtrl.create(GuideComponent, {user: user});
          guide.onDidDismiss(data => {
            this.isScroll = false;
          });
          guide.present()
        }
      })
      .catch(err => {
        console.log('err ', err);
        this.isScroll = true;
        guide = this.modalCtrl.create(GuideComponent,{user: user});
        guide.onDidDismiss(data => {
          this.isScroll = false;
        });
        guide.present();
      });
  }

  goTo(page){
    switch (page) {
      case 'WorkoutComponent': {
        this.navCtrl.setRoot(WorkoutComponent);
        break;
      }
      case 'ExercisesComponent': {
        this.navCtrl.setRoot(ExercisesComponent);
        break;
      }
      case 'plusmember': {
        this.modalCtrl.create(PlusmemberComponent).present();
        break;
      }
      case 'WarmupComponent': {
        this.navCtrl.setRoot(WarmupComponent);
        break;
      }
      default: {
        //statements;
        break;
      }
    }

  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
