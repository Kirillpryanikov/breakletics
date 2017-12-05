import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'filter-video',
  templateUrl: 'filter.video.component.html',
  styleUrls: ['/filter.scss']
})
export class FilterVideoComponent implements OnInit {
  @ViewChild('containerFilters') containerFilters: ElementRef;
  private difficulty: false;
  private category: false;
  private warmcold: false;
  private dataPrev: any;
  private filters: any;
  private templateObj = {
    difficulty: [],
    category: [],
    warmcold: [],
    list: ''
  };


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private render: Renderer2) {}

  ngOnInit(){
    let { difficulty, category, warmcold, select } = this.navParams.data;
    this.difficulty = difficulty;
    this.category = category;
    this.warmcold = warmcold;

    this.filters = select ? select :  JSON.parse(JSON.stringify(this.templateObj));
    this.dataPrev = select ? JSON.parse(JSON.stringify(select)) : undefined;
  }

  ionViewWillEnter() {
    this.selectFilters('difficulty');
    this.selectFilters('category');
    this.selectFilters('warmcold');
  }

  close(data) {
    let res = data ? this.filters : this.dataPrev ? this.dataPrev : this.templateObj;
    res.list = this.convertArrayToString(res);
    this.viewCtrl.dismiss(res);
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

  convertArrayToString(obj) {
    if(!obj) return;
    let arr = [];
    const keys = Object.keys(obj);
    for(let i=0; i < keys.length; i++) {
      if(keys[i] !== 'list') {
        arr = arr.concat(obj[keys[i]]);
      }
    }
    return arr.join(', ');
  }
}
