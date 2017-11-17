import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import { WelcomePageComponent } from '../welcome/welcome';
import { LoginService } from './login.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPageComponent implements OnDestroy {
  private loading: any;
  private loginObservable: Subscription;

  constructor(private navCtrl: NavController,
              private service: LoginService,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
      this.loading = this.loadingCtrl.create({});
  }

  login(form: NgForm) {
    this.loading.present();

    let data = form.value;
    data.username = form.value.email;

    this.loginObservable = this.service.login(data)
      .subscribe(responce => {
        if(responce.token) {
          this.nativeStorage.setItem('token', responce.token);
          this.navCtrl.push(DashboardComponent);
        } else {
          this.presentToast();
        }
        this.loading.dismiss();
      }, err => {
        this.loading.dismiss();
        this.presentToast();
      })
  }

  goToWelcome() {
    this.navCtrl.setRoot(WelcomePageComponent);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Not found user',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  ngOnDestroy() {
    if(this.loginObservable) {
      this.loginObservable.unsubscribe();
    }
  }
}
