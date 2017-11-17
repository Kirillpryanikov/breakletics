import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPageComponent } from  '../login/login';
import { RegisterPageComponent } from  '../register/register';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styleUrls: ['/welcome.scss']
})
export class WelcomePageComponent {

  constructor(public navCtrl: NavController) {}
  goToPage(pageName) {
    console.log(pageName);
    const page = (pageName === 'login') ? LoginPageComponent : RegisterPageComponent;
    this.navCtrl.push(page);
  }
}
