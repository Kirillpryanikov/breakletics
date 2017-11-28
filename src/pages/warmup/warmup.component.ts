import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { WelcomePageComponent } from '../welcome/welcome';

@Component({
  selector: 'page-warmup',
  templateUrl: 'warmup.html',
  styleUrls: ['/warmup.scss']
})
export class WarmupComponent implements OnInit {
  private loading: any;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams) {
    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    let user = this.navParams.get('user');
  }

  logout() {
    this.nativeStorage.clear();
    this.navCtrl.setRoot(WelcomePageComponent);
  }
}
