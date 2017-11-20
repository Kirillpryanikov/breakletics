import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import {DashboardComponent, WorkoutComponent, ExercisesComponent, WarmupComponent  } from "../index";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['/tabs.scss']
})
export class TabsComponent implements OnInit {
  dashboard = DashboardComponent;
  workout = WorkoutComponent;
  exercises = ExercisesComponent;
  warmup = WarmupComponent;

  constructor(public navCtrl: NavController,
              ) {
  }

  ngOnInit(){
  }
}
