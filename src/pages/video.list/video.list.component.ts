import {Component, Input, OnInit} from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {ConfigService} from "../config.service";
import { Video } from '../share/Video';

import {
  DashboardComponent,
  FilterVideoComponent,
  WrapperVideoPlayerComponent
} from '../index'

@Component({
  selector: 'video-list',
  templateUrl: 'video.list.html',
  styleUrls: ['/video.list.scss']
})

export class VideoListComponent implements OnInit {
  @Input() videos: Video[];
  @Input() title: string;

  private loading: any;
  private tabBarElement: any;
  public levels;
  public selectFilters = undefined;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams) {

  }

  ngOnInit(){
    this.levels = ConfigService.LEVELS;
    console.log('video', this.videos);
    let user = this.navParams.get('user');
    // this.presentLoading();
  }

  playVideoModal(video) {
    if(video.video_url) {
      this.modalCtrl.create(WrapperVideoPlayerComponent, {video: video}).present();
    }
  }

  presentLoading(){
    if(!this.loading){
      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      try {
        this.loading.dismiss();
      }
      catch (exception) {
        console.log(exception)
      }
      this.loading = null;
    }
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  getFilters() {
    const modal = this.modalCtrl.create(FilterVideoComponent, {difficulty: true, category: true, select: this.selectFilters});
    modal.onDidDismiss((data) => {
      if(data) {
        this.selectFilters = data;
        console.log('data', data);
      }
    });
    modal.present();
  }
  clearFilters() {
    this.selectFilters = undefined;
  }
}
