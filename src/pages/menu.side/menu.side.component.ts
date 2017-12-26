import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ItemMenuSide} from '../item.menu.side/item.menu.side';

import {
  SettingsComponent,
  WarmupComponent,
  ExercisesComponent,
  WorkoutComponent,
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

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private iab: InAppBrowser,
              private translate: TranslateService,
              private auth: AuthorizationService,
              private service: DashbordService) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
    this.user = this.auth.user.get();
  }

  someMethods(title) {
    this.navCtrl.push(ItemMenuSide , {data: title})
  }

  playVideoWeek(){
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.modalCtrl.create(WrapperVideoPlayerComponent, {video: res}).present();
    }, err => {
      console.log('err video::: ', err);
    });
  }

  goTo(page){
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
        this.navCtrl.push(SettingsComponent);
        break;
      }
      case 'WorkoutComponent': {
        this.navCtrl.setRoot(TabsComponent, {tab: 1});
        break;
      }
      case 'ExercisesComponent': {
        console.log(this.navCtrl);
        this.navCtrl.setRoot(TabsComponent, {tab: 2});
        break;
      }
      case 'WarmupComponent': {
        this.navCtrl.setRoot(TabsComponent, {tab: 3});
        break;
      }
      case 'AGB': {
        this.navCtrl.push(AgbComponent);
        break;
      }
      case 'IMPRINT': {
        this.navCtrl.push(ImprintComponent);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  logout(){
    this.auth.session.reset();
    this.navCtrl.setRoot(WelcomePageComponent);
  }

  goToLink(url: string) {
    const browser = this.iab.create('url', '_system');
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
  }
}
