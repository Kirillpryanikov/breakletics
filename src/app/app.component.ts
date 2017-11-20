import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';

import {
  LoginPageComponent,
  WelcomePageComponent,
  RegisterPageComponent,
  DashboardComponent,
  TabsComponent,
  ExtraQuestionsComponent
} from '../pages/index'

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private translate: TranslateService,
              private nativeStorage: NativeStorage) {
    this.initializeApp();
  }

  ngOnInit(){
    this.isAuth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  /**
   * Set language app
   */
  initTranslate() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  isAuth() {
    this.nativeStorage.getItem('token')
      .then(res => {
        if(!res){
          // this.rootPage = RegisterPageComponent;
          this.rootPage = WelcomePageComponent;
          // this.rootPage = TabsComponent;
          // this.rootPage = ExtraQuestionsComponent;
        } else {
          this.rootPage = WelcomePageComponent;
          // this.rootPage = TabsComponent;
        }
      })
      .catch(err => {
        // this.rootPage = ExtraQuestionsComponent;
        // this.rootPage = WelcomePageComponent;
        // this.rootPage = RegisterPageComponent
        // this.rootPage = TabsComponent;
        this.rootPage = WelcomePageComponent;
        console.log('ERR in app.component ', err);
      })
  }
}
