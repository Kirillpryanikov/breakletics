import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
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
  protected form: FormGroup;

  protected countTrain = '';
  protected hear = '';
  protected mission = '';
  protected location = '';

  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              private service: ExtraQuestionsService,
              private auth: AuthorizationService,
              private helper: HelperService,
              private alertCtrl: AlertController,
              public fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.auth.user.get();
    let language = this.translate.currentLang === 'de'? 'DE': 'EN';
    let locations = this.service.getLocation();

    this.locations = locations.map(function (el) {
      if(el && el.properties) {
        return el.properties[language];
      }
    });

    this.form = this.fb.group({
      birthday: new FormControl({value:''}),
      where_are_you_from: new FormControl({value:''}),
      why_do_you_want_to_do_breakletics: new FormControl({value:''}),
      how_did_you_learn_about_breakletics: new FormControl({value:''}),
      how_often_do_you_train_per_week: new FormControl({value:''})
    })
  }

  stpSelect(event, key, fieldForm, param?) {
    if(event === 'other') {
      this.translate.get(key).subscribe(text => {
        let language = this.translate.currentLang;
        const alert = this.alertCtrl.create({
          title: language === 'de' ? 'Andere' : 'Other',
          subTitle: text,
          inputs: [
            {
              name: 'quantity'
            },
          ],
          buttons: [{
            text: 'OK',
            handler: data => {
              this.form.get(fieldForm).patchValue(data.quantity);
              this[param] = data.quantity;
            }
          }]
        });
        alert.present();
        this[param] = undefined;
      });
    }

  }

  submit() {
    this.helper.loading.show();
    this.user = this.auth.user.get();
    let data = this.form.value;
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

  showAlert() {

  }

  ngOnDestroy() {
    this.helper.loading.hide();
  }
}
