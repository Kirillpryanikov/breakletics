import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  styleUrls: ['/welcome.scss']
})
export class WelcomePageComponent {

  constructor(public navCtrl: NavController) {}
}
