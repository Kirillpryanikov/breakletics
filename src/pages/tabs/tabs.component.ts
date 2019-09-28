import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {DashboardComponent, WorkoutComponent, ExercisesComponent, WarmupComponent  } from "../index";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['/tabs.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  @ViewChild('tabContainer') tabRef: Tabs;

  public selected: number;

  dashboard = DashboardComponent;
  workout = WorkoutComponent;
  exercises = ExercisesComponent;
  warmup = WarmupComponent;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
  }

  ngOnInit(){
    if(this.navParams.get('tab') > 0) {
      this.selected = this.navParams.get('tab');
    }
  }

  ngOnDestroy(){}
}
