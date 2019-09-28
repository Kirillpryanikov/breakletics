import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, ViewController, Platform } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberComponent} from "../plusmember/plusmember.component";
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class ADLeyersComponent implements OnInit {
  public language: string;
  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private translate: TranslateService,
              private modalCtrl: ModalController,
              private screenOrientation: ScreenOrientation,
              private platform: Platform) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit(){
    this.language = this.translate.currentLang;

  }

  showPlus(){
    this.modalCtrl.create(PlusmemberComponent).present();
    setTimeout(()=>{
      this.viewCtrl.dismiss();
    },1000);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
