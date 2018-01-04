import {Component, OnInit } from '@angular/core';
import {ModalController, App, MenuController, Events} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ItemMenuSide} from '../item.menu.side/item.menu.side';

import {
  SettingsComponent,
  ImprintComponent,
  PlusmemberComponent,
  ADLeyersComponent,
  WelcomePageComponent
} from "../index";

import {AgbComponent} from "../agb/agb.component";
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../share/User";
import {AuthorizationService} from "../../share/authorization.service";
import {WrapperVideoPlayerComponent} from "../wrapper.video.player/wrapper.video.player.component";
import {DashbordService} from './../dashboard/dashboard.service';
import {Subscription} from "rxjs/Subscription";
import {TabsComponent} from "../tabs/tabs.component";

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {
  public language;
  public user: User;
  private videoWeekObservable: Subscription;
  private nav;
  constructor(private modalCtrl: ModalController,
              private iab: InAppBrowser,
              private translate: TranslateService,
              private auth: AuthorizationService,
              private service: DashbordService,
              public app: App,
              public menu: MenuController,
              public events: Events) {
    events.subscribe('isOpen', (user) => {
      this.user = this.auth.user.get();
    });
  }

  ngOnInit() {
    this.user = this.auth.user.get();
    console.log(this.user);
    this.menu.swipeEnable(false);
    this.nav = this.app.getRootNav();
    this.language = this.translate.currentLang;
  }

  someMethods(title) {
    this.nav.push(ItemMenuSide , {data: title})
  }

  playVideoWeek(){
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.modalCtrl.create(WrapperVideoPlayerComponent, {video: res}).present();
    }, err => {
      console.log('err video::: ', err);
    });
  }

  goTo(page){
    this.menu.close();
    switch (page) {
      case 'XMAS_DEAL': {
        this.modalCtrl.create(ADLeyersComponent).present();
        break;
      }
      case 'PLUSMEMBER': {
        this.modalCtrl.create(PlusmemberComponent).present();
        break;
      }
      case 'MY_ACCOUNT': {
        this.nav.push(SettingsComponent);
        break;
      }
      case 'WorkoutComponent': {
        this.nav.setRoot(TabsComponent, {tab: 1});
        break;
      }
      case 'ExercisesComponent': {
        this.nav.setRoot(TabsComponent, {tab: 2});
        break;
      }
      case 'WarmupComponent': {
        this.nav.setRoot(TabsComponent, {tab: 3});
        break;
      }
      case 'AGB': {
        this.nav.push(AgbComponent);
        break;
      }
      case 'IMPRINT': {
        this.nav.push(ImprintComponent);
        break;
      }
      case 'LOGOUT': {
        this.logout();
        break;
      }
      default: {
        break;
      }
    }
  }

  logout(){
    this.auth.session.reset();
    this.nav.setRoot(WelcomePageComponent);
  }

  goToLink(url: string, lng: boolean) {
    if(lng){
      url = this.translate.instant(url);
      console.log('url :: ', url);
    }
    const browser = this.iab.create(url, '_system');
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
  }
}
