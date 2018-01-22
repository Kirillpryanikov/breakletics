import {Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {NavController, ModalController, Events, MenuController} from 'ionic-angular';
import {ConfigService} from "../config.service";
import { Video } from '../../share/Video';
import { VideoListService } from './video.list.service';
import { Keyboard } from '@ionic-native/keyboard';

import {
  FilterVideoComponent,
  WrapperVideoPlayerComponent
} from '../index'
import {Subscription} from "rxjs/Subscription";
import {AuthorizationService} from "../../share/authorization.service";
import {User} from "../../share/User";
import {Tabs} from "ionic-angular/navigation/nav-interfaces";
import {TabsComponent} from "../tabs/tabs.component";
import {HelperService} from "../../share/helper.service";
import {PlusmemberComponent} from "../plusmember/plusmember.component";
import {ADLeyersComponent} from "../ad.leyers/ad.leyers.component";

@Component({
  selector: 'video-list',
  templateUrl: 'video.list.html',
  styleUrls: ['/video.list.scss']
})

export class VideoListComponent implements OnInit {
  @ViewChild('tabContainer') tabContainer: Tabs;
  @Output() menuOpenHook = new EventEmitter<boolean>();

  @Input() videos: Video[];
  @Input() title: string;
  @Input() search: boolean;
  @Input() showDuration: boolean;
  @Input() showLevels: boolean;
  @Input() hideBanner: boolean;
  @Input() placeholder: string;
  @Input('page') page: string;
  @Input('bannerTitle') bannerTitle: string;

  private vidoeObservable: Subscription;
  private loading: any;
  private tabBarElement: any;
  public levels;
  public selectFilters = undefined;
  public user: User;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private service: VideoListService,
              private keyboard: Keyboard,
              private authService: AuthorizationService,
              private helper: HelperService,
              private events: Events,
              private menuCtrl: MenuController) {}

  ngOnInit(){
    this.levels = ConfigService.LEVELS;
    this.user = this.authService.user.get();
    this.events.publish('isOpen');
  }

  getData(req) {
    this.helper.loading.show();
    this.vidoeObservable = this.service[this.page](req).subscribe(res => {
      this.videos = res;
      this.helper.loading.hide();
    })
  }

  searchByName(ev) {
    this.keyboard.close();
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

  goToDash() {
      if(!this.navCtrl.parent || this.navCtrl.parent === null) {
        console.log('NUll pagents');
          this.navCtrl.setRoot(TabsComponent);
      } else {
          this.navCtrl.parent.select(0);
      }
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
        warmup: allow.warmup,
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
      warmup: false,
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
        filters.warmup = true;
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

  openMenu() {
    this.events.publish('isOpen');
    this.menuOpenHook.emit();
    this.menuCtrl.open();
  }

  goTo(page?){
    this.modalCtrl.create(PlusmemberComponent).present();
  }

  showAdComponent(){
    console.log('!!!!!!! showAdComponent !!!!!!!!!!!')
    this.modalCtrl.create(ADLeyersComponent).present();
  }

  ngOnDestroy() {
    if(this.vidoeObservable) {
      this.vidoeObservable.unsubscribe();
    }
  }
}
