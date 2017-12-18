import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import {
  TabsComponent,
  PasswordRestoreComponent,
  WelcomePageComponent,
  AgbComponent
} from '../index';
import { Subscription } from "rxjs/Subscription";
import {RegisterPageComponent} from "../register/register";
import { AuthorizationService } from '../../share/authorization.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})

export class LoginPageComponent implements OnDestroy {
  private loading: any;
  private toast: any;
  private loginObservable: Subscription;

  constructor(private navCtrl: NavController,
              private service: AuthorizationService,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  login(form: NgForm) {
    this.presentLoading();
    let data = form.value;
    data.username = form.value.email;
    if(!data.email || !data.password) {
      /**
       * If someone field is empty
       */
      this.presentToast(400);
      this.dismissLoading();
      return false;
    }
    this.loginObservable = this.service.login(data)
      .subscribe(responce => {
        console.log('User responce :: ', responce);
        if(responce.token) {
          this.nativeStorage.setItem('user', responce);
          this.navCtrl.push(TabsComponent,{ user: responce });
        }
        this.dismissLoading();

      }, err => {
        console.log('ERR:::: ', err);
        this.dismissLoading();
        this.presentToast(err.status);
      })
  }

  goTo(page:string) {
    let setPage: any;
    switch(page) {
      case 'Welcome': {
        setPage = WelcomePageComponent;
        break;
      }
      case 'SignUp': {
        setPage = RegisterPageComponent;
        break;
      }
      case 'Forgot': {
        setPage = PasswordRestoreComponent;
        break;
      }
      case 'AGB': {
        setPage = AgbComponent;
        break;
      }
      default: {
      }
    }

    this.navCtrl.push(setPage);
  }

  dismissLoading() {
    if (this.loading) {
      try {
        this.loading.dismiss();
      }
      catch (exception) {
        console.log(exception)
      }
      this.loading = null;
    }
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

  presentToast(status) {
    let msg: string;

    if(status === 400) {
      msg = 'Check fields';
    } else {
      msg = 'Not found user'
    }
    if (this.toast) this.toast.dismiss();
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 3500,
      position: 'bottom',
      showCloseButton: true
    });
    this.toast.present();
  }

  ngOnDestroy() {
    if(this.loginObservable) {
      this.loginObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
