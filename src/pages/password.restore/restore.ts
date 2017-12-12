import { Component, OnDestroy } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'password-restore',
  templateUrl: 'restore.html',
  styleUrls: ['/restore.scss']
})
export class PasswordRestoreComponent implements OnDestroy {
  private loading: any;

  constructor(private navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController)
  {}

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

  ngOnDestroy() {
  }
}
