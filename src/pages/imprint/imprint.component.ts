import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imprint-component',
  templateUrl: 'imprint.html',
  styleUrls: ['/imprint.scss']
})

export class ImprintComponent implements OnInit {
  public language: string;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private translate: TranslateService) {}
  ngOnInit(){
    this.language = this.translate.currentLang;
  }

}
