import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { GuideComponent } from '../guide/guide.component';
import { WelcomePageComponent } from '../welcome/welcome';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
  styleUrls: ['/workout.scss']
})
export class WorkoutComponent implements OnInit {
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

}
