import {Component, Input, OnInit} from '@angular/core';
import {NavController, ModalController, LoadingController, NavParams} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {ConfigService} from "../config.service";
import { Video } from '../../share/Video';
import { VideoListService } from './video.list.service';
import { Keyboard } from '@ionic-native/keyboard';

import {
  DashboardComponent,
  FilterVideoComponent,
  WrapperVideoPlayerComponent
} from '../index'
import {Subscription} from "rxjs/Subscription";

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
  @Input() showDuration: boolean;
  @Input() showLevels: boolean;

  private vidoeObservable: Subscription;
  private loading: any;
  private tabBarElement: any;
  public levels;
  public selectFilters = undefined;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: VideoListService,
              private keyboard: Keyboard) {}

  ngOnInit(){
    this.levels = ConfigService.LEVELS;
    console.log('this.levels', this.levels);
    console.log('this.page :: ', this.page);
    let user = this.navParams.get('user');
    // this.presentLoading();
  }

  getData(req) {
    this.vidoeObservable = this.service[this.page](req).subscribe(res => {
      this.videos = res;
      console.log('Answer :: ', res);
    })
  }

  searchByName(ev) {
    this.keyboard.close();
    console.log('ev', ev.target.value);
    this.getData({"search":ev.target.value});
  }

  onCancel(ev) {
    let el = document.querySelector('.searchbar-input');
    ev.target.value = '';
    this.keyboard.close();
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
        this.getData(data);
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
    if(!this.selectFilters)
      return;

    this.selectFilters = undefined;
    this.getData(null);
  }

  ngOnDestroy() {
    if(this.vidoeObservable) {
      this.vidoeObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
