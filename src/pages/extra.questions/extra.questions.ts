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

  ngOnInit() {
    this.user = this.navParams.get('user');
    console.log('extra component data --> ', this.user);
  }

  stpSelect() {
    console.log('STP selected');
  }

  submit(extra: NgForm) {
    console.log('NgForm', );
    this.navCtrl.setRoot(DashboardComponent, {user: this.user});
  }
}
