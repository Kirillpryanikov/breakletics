import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-auth',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPageComponent {

  constructor(public navCtrl: NavController) {

  }
}
