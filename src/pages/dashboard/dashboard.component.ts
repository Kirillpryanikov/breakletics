import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { GuideComponent } from '../guide/guide.component';
import { WelcomePageComponent } from '../welcome/welcome';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private loading: any;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    this.presentGuideModal();
  }

  logout() {
    this.loading.present();

    this.nativeStorage.clear()
      .then(res => {
        this.navCtrl.setRoot(WelcomePageComponent);
        this.loading.dismiss();
      })
      .catch(err => {
        console.log('Dashboard component ERR --> ', err);
        this.loading.dismiss();
      })
  }

  presentGuideModal() {
    this.nativeStorage.getItem('guide')
      .then(res => {
        if(!res){
          this.modalCtrl.create(GuideComponent).present();
        }
      })
      .catch(err => {
        console.log('ERRR ---> ', err);
        this.modalCtrl.create(GuideComponent).present();
      })
  }
}
