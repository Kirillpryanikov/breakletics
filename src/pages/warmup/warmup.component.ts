import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { WelcomePageComponent } from '../welcome/welcome';

@Component({
  selector: 'page-warmup',
  templateUrl: 'warmup.html',
  styleUrls: ['/warmup.scss']
})
export class WarmupComponent implements OnInit, OnDestroy {
  private loading: any;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {
    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    let user = this.navParams.get('user');
  }

  ngOnDestroy() {
  }

  logout() {
    this.nativeStorage.clear();
    this.navCtrl.setRoot(WelcomePageComponent);
  }
}
