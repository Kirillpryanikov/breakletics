import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';


@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
  styleUrls: ['/guide.scss', '/guide1.scss', '/guide2.scss', '/guide3.scss']
})
export class GuideComponent {
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter() {
    this.slider.lockSwipes(true);
  }

  goNextSlide(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
  }
}
