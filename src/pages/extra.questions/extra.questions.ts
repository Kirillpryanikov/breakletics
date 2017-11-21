import { Component, OnInit, NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import { DashboardComponent  } from '../';

@Component({
  selector: 'page-extra-questions',
  templateUrl: 'extra.questions.html',
  styleUrls: ['/extra.questions.scss']
})

export class ExtraQuestionsComponent implements OnInit {
  constructor(public navCtrl: NavController,
              private navParams: NavParams) {}

  user: object;

  select: any;
  options = [
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_1' },
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_2' },
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_3' },
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_4' },
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_5' },
    { value: 'PAGE_EXTRA.FORM_Q.MISSION.OPT_6' }
  ];

  ngOnInit() {
    this.user = this.navParams.get('data');
    console.log('extra component data --> ', this.user);
  }

  stpSelect() {
    console.log('STP selected');
  }

  submit(extra: NgForm) {
    console.log('NgForm', extra.value);
    this.navCtrl.setRoot(DashboardComponent, {user: this.user})
  }
}
