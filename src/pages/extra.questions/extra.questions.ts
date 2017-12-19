import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import { TabsComponent  } from '../index';
import {TranslateService} from "@ngx-translate/core";
import {ExtraQuestionsService} from "./extra.qustetions.service";
import {AuthorizationService} from "../../share/authorization.service";
import {User} from "../../share/User";

@Component({
  selector: 'page-extra-questions',
  templateUrl: 'extra.questions.html',
  styleUrls: ['/extra.questions.scss']
})

export class ExtraQuestionsComponent implements OnInit {
  public user: User;
  public locations;
  private loading;
  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private translate: TranslateService,
              private service: ExtraQuestionsService,
              private auth: AuthorizationService,
              private loadingCtrl: LoadingController
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
    this.presentLoading();
    this.user = this.auth.user.get();
    console.log('NgForm', extra.value, this.user);
    let data = extra.value;
    data["id"] = this.user['id'];

    this.auth.user.update(data).subscribe(responce => {
      console.log('auth.user.update Responce :: ', responce);
      this.dismissLoading();
      // this.auth.session.start();
    }, err => {
      console.log('ERR:::: ', err);
      this.dismissLoading();
    });
    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }

  skip() {
    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }

  presentLoading(){
    if(!this.loading){
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent',
        duration: 3000
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      try {
        this.loading.dismiss();
      }
      catch (exception) {
      }
      this.loading = null;
    }
  }
}
