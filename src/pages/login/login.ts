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
  private toast: any;

  private loginObservable: Subscription;

  constructor(private navCtrl: NavController,
              private service: LoginService,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  login(form: NgForm) {
    this.presentLoading();
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
        this.dismissLoading();

      }, err => {
        this.dismissLoading();
        this.presentToast();
      })
  }

  goToWelcome() {
    this.navCtrl.setRoot(WelcomePageComponent);
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
      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
  }

  presentToast() {
    if (this.toast) this.toast.dismiss();
    this.toast = this.toastCtrl.create({
      message: 'Not found user',
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
  }
}
