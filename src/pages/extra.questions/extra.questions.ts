import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {TabsComponent} from '../index';
import {TranslateService} from "@ngx-translate/core";
import {ExtraQuestionsService} from "./extra.qustetions.service";
import {AuthorizationService} from "../../share/authorization.service";
import {User} from "../../share/User";
import {HelperService} from "../../share/helper.service";

@Component({
  selector: 'page-extra-questions',
  templateUrl: 'extra.questions.html',
  styleUrls: ['/extra.questions.scss']
})

export class ExtraQuestionsComponent implements OnInit {
  public user: User;
  public locations;

  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              private service: ExtraQuestionsService,
              private auth: AuthorizationService,
              private helper: HelperService
              ) {}

  ngOnInit() {
    this.user = this.auth.user.get();
    let language = this.translate.currentLang === 'de'? 'DE': 'EN';
    let locations = this.service.getLocation();

    this.locations = locations.map(function (el) {
      if(el && el.properties) {
        return el.properties[language];
      }
    });
  }

  stpSelect() {
    console.log('STP selected');
  }

  submit(extra: NgForm) {
    this.helper.loading.show();
    this.user = this.auth.user.get();
    let data = extra.value;
    data["id"] = this.user['id'];

    this.auth.user.update(data).subscribe(responce => {
      this.helper.loading.hide();
    }, err => {
      console.log('ERR:::: ', err);
      this.helper.loading.hide();
    });

    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }

  skip() {
    this.navCtrl.setRoot(TabsComponent, {user: this.user});
  }

  ngOnDestroy() {
    this.helper.loading.hide();
  }
}
