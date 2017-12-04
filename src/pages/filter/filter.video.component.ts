import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import {NavController, ModalController, LoadingController, NavParams, ViewController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'filter-video',
  templateUrl: 'filter.video.component.html',
  styleUrls: ['/filter.scss']
})
export class FilterVideoComponent implements OnInit, OnDestroy {
  @ViewChild('containerFilters') containerFilters: ElementRef;
  workouts: false;
  exercises: false;
  warm_up: false;

  protected filters = {
    workouts: [],
    exercises: [],
    warm_up: []
  };

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private render: Renderer2) {}

  ngOnInit(){
    let { workouts, exercises, warm_up, filters } = this.navParams.data;
    this.workouts = workouts;
    this.exercises = exercises;
    this.warm_up = warm_up;
    console.log('filters :::: ', filters );
    this.filters = filters ? filters : this.filters;
  }

  ionViewWillEnter() {
    this.selectFilters('workouts');
    this.selectFilters('exercises');
    this.selectFilters('warm_up');
  }

  close(data?) {
    console.log('close ', data);
    this.viewCtrl.dismiss(data);
  }

  setFilter(filter, value) {
    let isExist = undefined;
    this.filters[filter].forEach((f, index) => {
      if(f === value) {
        isExist = index + 1;
        return;
      }
    });
    if(!isExist) {
      this.filters[filter].push(value);
    } else {
      this.filters[filter].splice(isExist - 1, 1);
    }
    this.selectFilters(filter)
  }

  selectFilters(name) {
    const container = this.containerFilters.nativeElement.querySelectorAll(`.filters-${name} .filter-item`);
    for(let i = 0; i < container.length; i++) {
      let isActive = false;
      for(let j = 0; j < this.filters[name].length; j++){
        if(container[i].textContent.toLowerCase().trim() === this.filters[name][j].toLowerCase()) {
          this.render.addClass(container[i], 'active');
          isActive = true;
        }
      }
      if(!isActive) {
        this.render.removeClass(container[i], 'active');
      }
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy ::: ');
  this.filters = {
      workouts: [],
      exercises: [],
      warm_up: []
    };
  }
}
