import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { WelcomePageComponent } from '../welcome/welcome';
import { LoginService } from './login.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPageComponent {

  constructor(public navCtrl: NavController,
              private service: LoginService) {}

  login(form: NgForm) {
    console.log(form.value);
  }

  goToWelcome() {
    this.navCtrl.push(WelcomePageComponent);
  }
}
