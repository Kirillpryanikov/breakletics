import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { GuideComponent } from '../guide/guide.component';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController) {}

  ngOnInit(){
    this.presentGuideModal();
  }

  presentGuideModal(){
    this.modalCtrl.create(GuideComponent).present();
  }
}
