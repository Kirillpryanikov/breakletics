import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NavController, Slides, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
import { AuthorizationService } from '../../share/authorization.service';
import { TabsComponent } from '../index';
import { ExtraQuestionsComponent  } from '../extra.questions/extra.questions';
import { Subscription } from "rxjs/Subscription";
import { NativeStorage } from '@ionic-native/native-storage';

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
              private toastCtrl: ToastController,
              private nativeStorage: NativeStorage,
              private loginService: AuthorizationService) {}

  goNext() {
    this.slider.slideNext();
  }

  /**
   * Registration
   * @param {NgForm} f
   */
  submit(f: NgForm) {
    this.presentLoading();
    let data = f.value;
    /**
     * This is necessary. From WORDPERSS
     */
    data.username = f.value.email;

    this.regObservable = this.service.registration(data)
      .subscribe(responce => {
        this.authorization(responce.email, f.value.password, responce);
      }, err => {
        console.log('err register', err);
        this.slider.slideTo(0);
        this.presentToast(err.status);
        this.dismissLoading();
      })
  }

  /**
   * Authorization user after registration
   * @param username
   * @param password
   * @returns {Subscription}
   */
  authorization(username, password, user) {
    console.log('user step 1: ', user);
    return this.loginService.login({username, password})
      .subscribe(res =>{
        this.nativeStorage.setItem('user', res);
        this.navCtrl.push(ExtraQuestionsComponent, { user: user });
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

  /**
   * Method Notification about Error
   * @param status
   */
  presentToast(status) {
    let msg:string;

    if(status === 400) {
      msg = 'Check fields';
    } else {
      msg = 'User already register'
    }

    if (this.toast) this.toast.dismiss();
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });
    this.toast.present();
  }

  ngOnDestroy() {
    if(this.regObservable) {
      this.regObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
