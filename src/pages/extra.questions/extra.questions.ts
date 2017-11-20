import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    this.user = this.navParams.get('data');
    console.log('extra component data --> ', this.user);
  }

  goToDashboard() {
    this.navCtrl.setRoot(DashboardComponent, {user: this.user})
  }
}
