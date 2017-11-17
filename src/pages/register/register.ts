import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';
<<<<<<< HEAD
import { WelcomePageComponent } from '../welcome/welcome';
=======
import { LoginPageComponent } from '../login/login';
>>>>>>> 609559fbe6ebb7f863c565f9b823b10a5242c81a

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['/register.scss', '/register1.scss', '/register2.scss', '/register3.scss'],
})
export class RegisterPageComponent {
  @ViewChild('slider') slider: Slides;
  private loading: any;

  constructor(public navCtrl: NavController,
              private service: RegisterService,
              private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({});
  }

  goNext(){
    this.slider.slideNext();
  }

  submit(f: NgForm) {
<<<<<<< HEAD
    console.log(f.value);
  }

  goToWelcome() {
    this.navCtrl.push(WelcomePageComponent);
=======
    this.loading.present();
    let data = f.value;
    data.username = f.value.email;
    this.service.registration(data)
      .subscribe(responce => {
        this.navCtrl.push(LoginPageComponent);
        this.loading.dismiss();
      })
>>>>>>> 609559fbe6ebb7f863c565f9b823b10a5242c81a
  }
}
