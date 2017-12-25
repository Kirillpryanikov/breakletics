import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberService} from "./plusmember.service";

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
              private translate: TranslateService,
              private service: PlusmemberService,
  ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
    this.testimonials = this.service.testimonials(this.language);
    this.benefits = this.service.benefits(this.language);
  }
}
