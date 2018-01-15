import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PlusmemberService} from "./plusmember.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import { SafariViewController } from '@ionic-native/safari-view-controller';

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
              private safariViewController: SafariViewController,
              private iab: InAppBrowser
  ) {}

  ngOnInit(){
    this.language = this.translate.currentLang;
    this.testimonials = this.service.testimonials(this.language);
    this.benefits = this.service.benefits(this.language);
  }

  goToLink(url) {
    /**
     * for IOS app
     */
    this.safariViewController.isAvailable()
      .then((available: boolean) => {
        if(available) {
          this.safariViewController.show({
            url: url,
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: true
          })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'loaded') console.log('Loaded');
                else if(result.event === 'closed') console.log('Closed');
              },
              (error: any) => console.error(error)
            );
        } else {
          this.iab.create(url, '_system');
        }
      })

    // const browser = this.iab.create(url, '_system');
  }
}
