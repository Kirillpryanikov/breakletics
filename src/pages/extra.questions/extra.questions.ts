import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import { TabsComponent  } from '../index';
import {TranslateService} from "@ngx-translate/core";
import {ExtraQuestionsService} from "./extra.qustetions.service";

@Component({
  selector: 'page-extra-questions',
  templateUrl: 'extra.questions.html',
  styleUrls: ['/extra.questions.scss']
})

export class ExtraQuestionsComponent implements OnInit {
  user: object;
  public locations;
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private translate: TranslateService,
              private service: ExtraQuestionsService
              ) {}

  ngOnInit() {
    let language = this.translate.currentLang === 'de'? 'DE': 'EN';
    let locations = this.service.getLocation();
    this.locations = locations.map(function (el) {
      if(el && el.properties) {
        return el.properties[language];
      }
    });
    this.user = this.navParams.get('user');
    console.log('extra component data --> ', this.user);

  }

  stpSelect() {
    console.log('STP selected');
  }

  submit(extra: NgForm) {
    console.log('NgForm', extra, JSON.stringify(extra));
    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }

  skip() {
    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }
}
