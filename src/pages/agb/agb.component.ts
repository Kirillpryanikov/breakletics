import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'agb-component',
  templateUrl: 'agb.component.html',
  styleUrls: ['/agb.component.scss']
})
export class AgbComponent implements OnInit {
  public language: any;
  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
  }
}
