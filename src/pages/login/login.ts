import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPageComponent {

  constructor(public navCtrl: NavController) {}

  login(form: NgForm){
    console.log(form.value);
  }
}
