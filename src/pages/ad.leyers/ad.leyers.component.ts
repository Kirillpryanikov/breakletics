import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberComponent} from "../plusmember/plusmember.component";

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
              ) {}

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
