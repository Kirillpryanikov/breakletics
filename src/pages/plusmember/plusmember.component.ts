import { Component, OnInit } from '@angular/core';
import {App, NavController, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberService} from "./plusmember.service";
import {TabsComponent} from "../tabs/tabs.component";

@Component({
  selector: 'plusmember',
  templateUrl: 'plusmember.html',
  styleUrls: ['/plusmember.scss']
})
export class PlusmemberComponent implements OnInit {
  public language: string;
  public testimonials: any;
  public benefits: any;

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private translate: TranslateService,
              private service: PlusmemberService,
              private app: App,
  ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
      this.testimonials = this.service.testimonials();
      this.benefits = this.service.benefits(this.language);
  }

}
