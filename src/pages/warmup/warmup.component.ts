import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Video } from "../../share/Video";
import { Subscription } from "rxjs/Subscription";
import { DashboardComponent } from "../index";
import { WarmupService } from "./warmup.service";

@Component({
  selector: 'page-warmup',
  templateUrl: 'warmup.html',
  styleUrls: ['/warmup.scss']
})

export class WarmupComponent implements OnInit, OnDestroy {
  private loading: any;
  private warmupsObservable: Subscription;
  public warmupsData: Video[];
  private tabBarElement;

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private service: WarmupService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    this.getWarmups();
  }
  getWarmups() {
    this.presentLoading();

    this.warmupsObservable = this.service.warmups()
      .subscribe(responce => {
        console.log('Responce: =>', responce);
        this.warmupsData = responce;
        this.dismissLoading();
      }, err => {
        this.dismissLoading();
        console.log('Err: =>', err);
      })
  }

  presentLoading(){
    if(!this.loading){
      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
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

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ngOnDestroy() {
    if(this.warmupsObservable) {
      this.warmupsObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }
}
