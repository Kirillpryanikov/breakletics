import {
  Component, OnInit, OnDestroy, AfterContentInit, ElementRef, Renderer2, SecurityContext,
  ViewChild
} from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { GuideComponent } from '../guide/guide.component';
import { WelcomePageComponent } from '../welcome/welcome';
import { DashbordService } from './dashboard.service';
import { VideoWeekInterface } from '../interfaces/VideoWeekInterface';
import { Subscription } from "rxjs/Subscription";
import * as Player from "@vimeo/player/dist/player.js";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})

export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('playerContainer')
  playerFrame: ElementRef;

  private loading: any;
  public user: object;
  public video: VideoWeekInterface;
  public heightDevice: number;
  public weightDevice: number;

  public linkVideo: string;

  private videoWeekObservable: Subscription;
  private player: Player;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: DashbordService,
              private platform: Platform,
              private sanitizer: DomSanitizer,
              private elementRef: ElementRef,
              renderer: Renderer2) {

    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    this.weightDevice = this.platform.width();
    this.heightDevice = this.platform.height()* 29.5 / 100;

    this.getUser();
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.video = res;
      // this.linkVideo = 'https://player.vimeo.com/video/' + this.video.video.split('https://vimeo.com/')[1];
      this.linkVideo = 'https://player.vimeo.com/video/239159367';
    }, err => {
      console.log('err video', err);
    });

  }
  /**
   * get user from storage
   */
  getUser() {
    this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        console.log('this.user ', this.user);
        this.presentGuideModal(this.user)
      })
      .catch(err => {
        console.log('Error ngOnInit component --> ', err);
        this.user = this.navParams.get('user');
        this.presentGuideModal(this.user)
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

  presentGuideModal(user) {
    this.nativeStorage.getItem('guide')
      .then(res => {
        console.log('GET guide res', res);
        if(!res || res !== this.user['id']){
          this.modalCtrl.create(GuideComponent, {user: user}).present();
        }
      })
      .catch(err => {
        console.log('ERRR guide---> ', err);
        this.modalCtrl.create(GuideComponent,{user: user}).present();
      })
  }

  getGuide() {
    this.modalCtrl.create(GuideComponent).present();
  }

  ngAfterContentInit(){

    // setTimeout(()=> {
    //   this.player = new Player(this.playerFrame.nativeElement);
    //   console.log('AFTER CONTENT', this.player);
    //   this.player.on('play', function() {
    //     console.log('played the video!');
    //   });
    //   this.player.on('pause', function() {
    //     console.log('pause the video!');
    //   });
    //   this.player.play().then(function() {
    //     // the video was played
    //     console.log('PLAYED');
    //   }).catch(function(error) {
    //     console.log('error',error);
    //
    //     switch (error.name) {
    //       case 'PasswordError':
    //         // the video is password-protected and the viewer needs to enter the
    //         // password first
    //         break;
    //
    //       case 'PrivacyError':
    //         // the video is private
    //         break;
    //
    //       default:
    //         // some other error occurred
    //         break;
    //     }
    //   });
    // },8000);
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
  }
}
