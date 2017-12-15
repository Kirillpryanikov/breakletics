import { Component, OnInit } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'plusmember',
  templateUrl: 'plusmember.html',
  styleUrls: ['/plusmember.scss']
})
export class PlusmemberComponent implements OnInit {
  public language: string;
  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private translate: TranslateService,
              ) {}

  ngOnInit(){
    // this.language = this.translate.currentLang;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
