import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Video } from "../../share/Video";
import { Subscription } from "rxjs/Subscription";
import { DashboardComponent } from "../index";
import { WarmupService } from "./warmup.service";
import {HelperService} from "../../share/helper.service";

@Component({
  selector: 'page-warmup',
  templateUrl: 'warmup.html',
  styleUrls: ['/warmup.scss']
})

export class WarmupComponent implements OnInit, OnDestroy {
  private warmupsObservable: Subscription;
  public warmupsData: Video[];
  private tabBarElement;

  constructor(public navCtrl: NavController,
              private helper: HelperService,
              private service: WarmupService,
              ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ngOnInit(){
    this.getWarmups();
  }

  getWarmups() {
    this.helper.loading.show();

    this.warmupsObservable = this.service.warmups()
      .subscribe(responce => {
        this.warmupsData = responce;
        this.helper.loading.hide();
      }, err => {
        this.helper.loading.hide();
        console.log('Err: =>', err);
      })
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
  }
}
