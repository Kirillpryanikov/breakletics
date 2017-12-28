import { Component, ViewChild, OnDestroy } from '@angular/core';
import {ModalController, NavController, Slides, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../../share/authorization.service';
import { ExtraQuestionsComponent  } from '../extra.questions/extra.questions';
import { Subscription } from "rxjs/Subscription";
import {HelperService} from "../../share/helper.service";
import {AgbComponent} from "../index";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['/register.scss', '/register1.scss', '/register2.scss', '/register3.scss'],
})
export class RegisterPageComponent implements OnDestroy{
  @ViewChild('slider') slider: Slides;
  private toast: any;
  private regObservable: Subscription;

  constructor(public navCtrl: NavController,
              private helper: HelperService,
              private toastCtrl: ToastController,
              private auth: AuthorizationService,
              private modalCtrl: ModalController) {}

  goNext() {
    this.slider.slideNext();
  }

  /**
   * Registration
   * @param {NgForm} f
   */
  submit(f: NgForm) {
    this.helper.loading.show();
    let data = f.value;
    /**
     * This is necessary. From WORDPERSS
     */
    data.username = f.value.email;

    this.regObservable = this.auth.user.set(data)
      .subscribe(responce => {
        this.authorization(responce.email, f.value.password, responce);
      }, err => {
        console.log('err register', err);
        this.slider.slideTo(0);
        this.presentToast(err.status);
        this.helper.loading.hide();

      })
  }

  /**
   * Authorization user after registration
   * @param username
   * @param password
   * @returns {Subscription}
   */
  authorization(username, password, user) {
    return this.auth.login({username, password})
      .subscribe(res =>{
        this.navCtrl.push(ExtraQuestionsComponent);
        this.helper.loading.hide();
      })
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
  openModal() {
    this.modalCtrl.create(AgbComponent).present();
  }
  ngOnDestroy() {
    if(this.regObservable) {
      this.regObservable.unsubscribe();
    }
    this.helper.loading.hide();
  }
}
