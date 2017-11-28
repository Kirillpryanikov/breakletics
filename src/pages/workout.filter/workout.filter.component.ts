import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-workout-filter',
  templateUrl: 'workout.filter.html',
  styleUrls: ['/workout.filter.scss']
})
export class WorkoutFilterComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams) {}

  ngOnInit(){
    let user = this.navParams.get('user');
  }

  goToDash() {
    // this.navCtrl.setRoot(DashboardComponent);
  }
}
