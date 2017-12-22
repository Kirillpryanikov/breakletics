import { Component, OnInit  } from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {NativeStorage} from "@ionic-native/native-storage";
import {AuthorizationService} from "../../share/authorization.service";
import {User} from "../../share/User";
import { NgForm } from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExtraQuestionsService} from "../extra.questions/extra.qustetions.service";


@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['/account.scss']
})
export class AccountComponent implements OnInit {
  public locations: any[];
  public user: any;
  private loading;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private auth: AuthorizationService,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private extra: ExtraQuestionsService
              ) {}

  ngOnInit(){
    this.user = this.auth.user.get();

    if(this.user && this.user.birthday) {
      // this.user.birthday = new Date(parseInt(this.user.birthday)).toISOString();
    }

    let language = this.translate.currentLang === 'de'? 'DE': 'EN';
    let locations = this.extra.getLocation();
    this.locations = locations.map(function (el) {
      if(el && el.properties) {
        return el.properties[language];
      }
    });
    console.log('get User into setting', this.user);
  }

  update(meta: NgForm){
    console.log('before UPDATE :: ', meta.value);
    // this.presentLoading();

    let req = {
      id: this.user.id,
      birthday: this.user.birthday,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      where_are_you_from: this.user.where_are_you_from
    };

    this.auth.user.update(req).subscribe(responce => {
      console.log('auth.user.update Responce :: ', responce);
      // this.dismissLoading();
    }, err => {
      console.log('ERR:::: ', err);
      // this.dismissLoading();
    });
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

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }

  ngOnDestroy() {
    if(this.loading) {
      this.loading.dismiss();
    }
  }

}
