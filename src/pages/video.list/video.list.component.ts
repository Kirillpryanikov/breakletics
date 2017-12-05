import {Component, Input, OnInit} from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {ConfigService} from "../config.service";
import { Video } from '../share/Video';
import { VideoListService } from './video.list.service';

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
  @Input('page') page: string;
  @Input() search: boolean;

  private loading: any;
  private tabBarElement: any;
  public levels;
  public selectFilters = undefined;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: VideoListService) {}

  ngOnInit(){
    this.levels = ConfigService.LEVELS;
    console.log('video', this.videos);
    console.log('this.page :: ', this.page);
    let user = this.navParams.get('user');
    // this.presentLoading();
  }

  searchByName(ev) {
    this.service[this.page](ev.target).subscribe(res => {})
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
    let allow = this.getAllowFilter();
    const modal = this.modalCtrl.create(FilterVideoComponent,
      {
        levels: allow.levels,
        warmcold: allow.warmcold,
        category: allow.category,
        select: this.selectFilters
      });

    modal.onDidDismiss((data) => {
      if(data) {
        this.selectFilters = data;
        this.service[this.page](data).subscribe(res => {})
      }
    });
    modal.present();
  }

  getAllowFilter(){
    let filters = {
      levels: false,
      warmcold: false,
      category: false
    };

    switch (this.page){
      case 'workouts':
        filters.levels = true;
        break;
      case 'exercises':
        filters.levels = true;
        filters.category = true;
        break;
      case 'warmup':
        filters.warmcold = true;
        break;
      default: break;
    }
    return filters;
  }

  clearFilters() {
    this.selectFilters = undefined;
  }
}
