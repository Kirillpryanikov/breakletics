import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
              private loadingCtrl: LoadingController) {
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
        }
        this.loading.dismiss();
      })
  }

  goToWelcome() {
    this.navCtrl.setRoot(WelcomePageComponent);
  }

  ngOnDestroy() {
    if(this.loginObservable) {
      this.loginObservable.unsubscribe();
    }
  }
}
