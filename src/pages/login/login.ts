import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import { WelcomePageComponent } from '../welcome/welcome';
import { LoginService } from './login.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPageComponent {
  private loading: any;

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

    this.service.login(data)
      .subscribe(responce => {
        console.log('auth --> ', responce);
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
}
