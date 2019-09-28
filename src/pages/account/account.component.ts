import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DashboardComponent} from "../index";
import {AuthorizationService} from "../../share/authorization.service";
import {User} from "../../share/User";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ExtraQuestionsService} from "../extra.questions/extra.qustetions.service";


@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['/account.scss']
})
export class AccountComponent implements OnInit {
  public locations: any[];
  public user: User;
  public timer: any;
  constructor(public navCtrl: NavController,
              private auth: AuthorizationService,
              private translate: TranslateService,
              private extra: ExtraQuestionsService
              ) {}

  ngOnInit(){
    this.user = this.auth.user.get();
    let language = this.translate.currentLang === 'de'? 'DE': 'EN';
    let locations = this.extra.getLocation();

    this.locations = locations.map(function (el) {
      if(el && el.properties) {
        return el.properties[language];
      }
    });
  }

  update(meta: NgForm){
    let req = {
      id: this.user.id,
      birthday: meta.value.birthday,
      first_name: meta.value.first_name,
      last_name: meta.value.last_name,
      where_are_you_from: meta.value.where_are_you_from
    };

    this.auth.user.update(req).subscribe(responce => {
    }, err => {
      console.log('ERR:::: ', err);
    });
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }

  ngOnDestroy() {
  }

}
