import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DashboardComponent, WorkoutComponent, ExercisesComponent, WarmupComponent  } from "../index";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['/tabs.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  dashboard = DashboardComponent;
  workout = WorkoutComponent;
  exercises = ExercisesComponent;
  warmup = WarmupComponent;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(){}

  ngOnDestroy(){}
}
