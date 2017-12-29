import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Globalization } from '@ionic-native/globalization';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import {
  WelcomePageComponent,
  TabsComponent,
} from '../pages/index';

import {AuthorizationService} from "../share/authorization.service";

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
              private nativeStorage: NativeStorage,
              private screenOrientation: ScreenOrientation,
              private globalization: Globalization,
              private authService: AuthorizationService,
              private ga: GoogleAnalytics) {
    this.platform = platform;
    this.initializeApp();
  }

  ngOnInit(){
    this.isAuth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();

      // this.statusBar.backgroundColorByHexString('#161616');
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      this.initTranslate();

      this.ga.startTrackerWithId('UA-63203216-2')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('test');
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
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
    /**
     * Get language device
     */
    this.globalization.getPreferredLanguage()
      .then(res => {
        const countryCode = res.value.split('-')[0] !== 'de' ? 'en': 'de';
        this.translate.use(countryCode);

      })
      .catch(e => console.log('language app.component err --> ', e));
  }

  isAuth() {
    this.nativeStorage.getItem('user')
      .then(res => {
        if(res){
          this.authService.session.start(res);
          this.rootPage = TabsComponent;
        } else {
          this.rootPage = WelcomePageComponent;
          // this.rootPage = WelcomePageComponent;
          this.authService.session.reset();
        }

      })
      .catch(err => {
        // this.rootPage = WelcomePageComponent;
        this.authService.session.reset();
        this.rootPage = WelcomePageComponent;
      })
  }
}
