import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { WorkoutService } from './workout.service';
import { Video } from '../../share/Video';

import {
  DashboardComponent,
} from '../index'
import {HelperService} from "../../share/helper.service";

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
  styleUrls: ['/workout.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  private tabBarElement: any;
  private workoutObservable: Subscription;
  public workouts: Video[];
  public levels;

  constructor(public navCtrl: NavController,
              private service: WorkoutService,
              private helper: HelperService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ngOnInit(){
    this.helper.loading.show();
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutObservable = this.service.workouts()
      .subscribe(responce => {
        this.workouts = responce;
        this.helper.loading.hide();
      }, err => {
        this.helper.loading.hide();
        console.log('Err: =>', err);
      })
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

    this.helper.loading.hide();
  }
}
