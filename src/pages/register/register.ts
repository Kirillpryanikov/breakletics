import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NavController, Slides, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { WelcomePageComponent } from '../welcome/welcome';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['/register.scss', '/register1.scss', '/register2.scss', '/register3.scss'],
})
export class RegisterPageComponent implements OnDestroy{
  @ViewChild('slider') slider: Slides;
  private loading: any;

  private regObservable: Subscription;

  constructor(public navCtrl: NavController,
              private service: RegisterService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.loading = this.loadingCtrl.create({});
  }

  goNext() {
    this.slider.slideNext();
  }

  submit(f: NgForm) {
    this.loading.present();
    let data = f.value;
    data.username = f.value.email;

    this.regObservable = this.service.registration(data)
      .subscribe(responce => {
        this.navCtrl.push(WelcomePageComponent);
        this.loading.dismiss();
      }, err => {
        this.slider.slideTo(0);
        this.presentToast();
        this.loading.dismiss();
      })
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Fill in all the fields\n',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  ngOnDestroy() {
    if(this.regObservable) {
      this.regObservable.unsubscribe();
    }
  }
}
