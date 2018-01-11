import { Component, OnDestroy } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';
import { TranslateService } from '@ngx-translate/core';

import {
  TabsComponent,
  PasswordRestoreComponent,
  WelcomePageComponent,
  AgbComponent
} from '../index';
import { Subscription } from "rxjs/Subscription";
import {RegisterPageComponent} from "../register/register";
import { AuthorizationService } from '../../share/authorization.service';
import {HelperService} from "../../share/helper.service";

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
              private auth: AuthorizationService,
              private nativeStorage: NativeStorage,
              private helper: HelperService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private translate: TranslateService) {}

  login(form: NgForm) {
    this.helper.loading.show();
    let data = form.value;
    data.username = form.value.email;
    if(!data.email || !data.password) {
      /**
       * If someone field is empty
       */
      this.presentToast(400);
      this.helper.loading.hide();
      return false;
    }
    this.loginObservable = this.auth.login(data)
      .subscribe(responce => {
        console.log('User responce :: ', responce);

        if(responce.token) {
            this.helper.loading.hide();
            this.nativeStorage.setItem('user', responce);
          this.navCtrl.push(TabsComponent,{ user: responce });
        }

        this.helper.loading.hide();
      }, err => {
        console.log('ERR:::: ', err);
        this.helper.loading.hide();
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
        setPage = false;
      }
    }

    if(setPage)
      this.navCtrl.push(setPage);
  }

  openModal() {
    this.modalCtrl.create(AgbComponent).present();
  }

  presentToast(status) {
    let msg: string;

    if(status === 400) {
      msg = 'Check fields';
    } else {
      msg = this.translate.get('LOGIN_PAGE.NOT_FOUND_USER')['value'];
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
