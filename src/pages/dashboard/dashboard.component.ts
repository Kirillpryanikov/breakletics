import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavController, ModalController, NavParams, Platform} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {TranslateService} from "@ngx-translate/core";

import {
  GuideComponent,
  PlusmemberComponent,
  WrapperVideoPlayerComponent,
  WorkoutComponent,
  ExercisesComponent,
  WarmupComponent
} from '../';
import { DashbordService } from './dashboard.service';
import { Subscription } from "rxjs/Subscription";
import {HelperService} from "../../share/helper.service";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
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
              private helper: HelperService,
              private navParams: NavParams,
              private service: DashbordService,
              private platform: Platform,
              ) {
  }

  ngOnInit(){
    // this.changeTab();
    console.log('DashInit');
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

  /**
   * get user from storage
   */
  getUser() {
      this.helper.loading.show();
      this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        this.presentGuideModal(this.user);
        this.helper.loading.hide();
      })
      .catch(err => {
        this.user = this.navParams.get('user');
        this.presentGuideModal(this.user);
        this.helper.loading.hide();
      });
  }

  handlerLoadVideo() {
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.video = res;
    }, err => {
      console.log('err video::: ', err);
    });
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
          guide = this.modalCtrl.create(GuideComponent);
          guide.onDidDismiss(data => {
            this.isScroll = false;
          });
          guide.present()
        }
      })
      .catch(err => {
        console.log('err ', err);
        this.isScroll = true;
        guide = this.modalCtrl.create(GuideComponent);
        guide.onDidDismiss(data => {
          this.isScroll = false;
        });
        guide.present();
      });
  }

  goTo(page){
    switch (page) {
      case 'WorkoutComponent': {
        this.goToTab(1);
        break;
      }
      case 'ExercisesComponent': {
        this.goToTab(2);
        break;
      }
      case 'plusmember': {
        this.modalCtrl.create(PlusmemberComponent).present();
        break;
      }
      case 'WarmupComponent': {
        this.goToTab(3);
        break;
      }
      default: {
        break;
      }
    }
  }

  goToTab(toPage: number) {
    if(this.navCtrl.parent || this.navCtrl.parent !== null) {
      this.navCtrl.parent.select(toPage);
    } else {
      console.log('it is not a tab');
    }
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
    this.helper.loading.hide();
  }
}
