import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../../share/authorization.service";
import {Subscription} from "rxjs/Subscription";
import {HelperService} from "../../share/helper.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'password-restore',
  templateUrl: 'restore.html',
  styleUrls: ['/restore.scss']
})
export class PasswordRestoreComponent implements OnDestroy {
  private loading: any;
  private passwordObservable: Subscription;
  private toast: any;

  constructor(private auth: AuthorizationService,
              private toastCtrl: ToastController,
              private helper: HelperService,
              private translate: TranslateService)
  {}

  recovery(f:NgForm) {
    this.helper.loading.show();
    this.passwordObservable = this.auth.passwordRecovery(f.value.email)
      .subscribe(responce => {
        this.presentToast(this.translate.instant('FORGOT_PAGE.SUCCESS'));
        this.helper.loading.hide();
      }, err => {
        console.log('ERR:::: ', err);
        this.helper.loading.hide();
        this.presentToast(this.translate.instant('FORGOT_PAGE.ERROR'));
      })
  }

  presentToast(msg) {
    if (this.toast) this.toast.dismiss();
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'bottom'
    });

    this.toast.present();
  }

  ngOnDestroy() {
    if(this.passwordObservable) {
      this.passwordObservable.unsubscribe();
    }
  }
}
