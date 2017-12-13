import { Component, OnInit } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

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
              ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
