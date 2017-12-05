import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Subscription } from 'rxjs/Subscription';
import { WorkoutService } from './workout.service';
import { Video } from '../share/Video';

import {
  DashboardComponent,
  FilterVideoComponent
} from '../index'

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
  styleUrls: ['/workout.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  private loading: any;
  private tabBarElement: any;
  private workoutObservable: Subscription;
  public workuots: Video[];
  public levels;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: WorkoutService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ngOnInit(){
    let user = this.navParams.get('user');
    this.getWorkouts();
  }

  getWorkouts() {
    this.presentLoading();
    this.workoutObservable = this.service.workouts()
      .subscribe(responce => {
        console.log('Responce: =>', responce);
        this.workuots = responce;
        this.dismissLoading();
      }, err => {
        this.dismissLoading();
        console.log('Err: =>', err);
      })
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
  ngOnDestroy() {
    if(this.workoutObservable) {
      this.workoutObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
