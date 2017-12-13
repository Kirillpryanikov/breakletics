import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import { TabsComponent  } from '../index';

@Component({
  selector: 'page-extra-questions',
  templateUrl: 'extra.questions.html',
  styleUrls: ['/extra.questions.scss']
})

export class ExtraQuestionsComponent implements OnInit {
  user: object;

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {}

  ngOnInit() {
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
