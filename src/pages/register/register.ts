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

  private toast: any;
  private loading: any;
  private regObservable: Subscription;

  constructor(public navCtrl: NavController,
              private service: RegisterService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  goNext() {
    this.slider.slideNext();
  }

  submit(f: NgForm) {
    this.presentLoading();
    let data = f.value;
    /**
     * This is necessary. From WORDPERSS
     */
    data.username = f.value.email;

    this.regObservable = this.service.registration(data)
      .subscribe(responce => {
        this.navCtrl.push(WelcomePageComponent);
        this.dismissLoading();
      }, err => {
        this.slider.slideTo(0);
        this.presentToast();
        this.dismissLoading();
      })
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
      message: 'Fill in all the fields\n',
      duration: 3500,
      position: 'bottom'
    });
    this.toast.present();
  }

  ngOnDestroy() {
    if(this.regObservable) {
      this.regObservable.unsubscribe();
    }
  }
}
