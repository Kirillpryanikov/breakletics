import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['/register.scss', '/register1.scss', '/register2.scss', '/register3.scss'],
})
export class RegisterPageComponent {
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController) {}

  goNext(){
    this.slider.slideNext();
  }

  submitForm(f: NgForm) {
    console.log(f.value)
  }
}
