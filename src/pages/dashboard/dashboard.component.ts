import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {NavController, ModalController, NavParams, Events, Platform, MenuController} from 'ionic-angular';
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
import {AuthorizationService} from "../../share/authorization.service";


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
  @Output() menuOpenHook = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              private translate: TranslateService,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private helper: HelperService,
              private navParams: NavParams,
              private service: DashbordService,
              private platform: Platform,
              public menuCtrl: MenuController,
              public events: Events,
              private auth: AuthorizationService
              ) {
  }

  ngOnInit(){
    // this.changeTab();
    this.menu.swipeEnable(true);
    this.events.publish('isOpen');
    this.weightDevice = this.platform.width();
    this.heightDevice = this.platform.height()* 29.5 / 100;
    this.getUser();
    this.handlerLoadVideo();
  }

  openMenu() {
    this.events.publish('isOpen');
    this.menuOpenHook.emit();
    this.menuCtrl.open();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.language = this.translate.currentLang;
      this.rundStr = this.service.getRundomString(this.translate.currentLang);
      this.rundStr = this.rundStr.toLowerCase();
      let letter = this.rundStr.split('');
      letter[0] = letter[0].toUpperCase();
      this.rundStr  = letter.join('');
    },2000);

    this.language = this.translate.currentLang;
    this.rundStr = this.service.getRundomString(this.translate.currentLang);
    console.log('this.translate.currentLan ', this.language);

  }

  /**
   * get user from storage
   */
  getUser() {
      this.helper.loading.show();
      this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        console.log('RES this.user',this.user);
        this.presentGuideModal(this.user);
        this.helper.loading.hide();
      })
      .catch(err => {
        console.log('Catch this.user',this.user);
        this.user = this.auth.user.get();
        console.log('this.user',this.user);

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
          setTimeout(()=> {
            if(this.user && this.user['plusmember'] < 1)
              guide.present()
          },500)
        }
      })
      .catch(err => {
        console.log('err ', err);
        this.isScroll = true;
        guide = this.modalCtrl.create(GuideComponent);
        guide.onDidDismiss(data => {
          this.isScroll = false;
        });
        setTimeout(()=> {
          if(this.user && this.user['plusmember'] < 1)
            guide.present()
        },500)
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
    this.menu.close('mainmenu');
    this.menu.swipeEnable(false);
    this.helper.loading.hide();
  }
}
