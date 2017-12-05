import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Subscription } from 'rxjs/Subscription';
import { ExercisesService } from './exercises.service';
import { Video } from "../share/Video";

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
  styleUrls: ['/exercises.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  private loading: any;
  private exercisesObservable: Subscription;
  private exercises: Video[];
  private tabBarElement;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: ExercisesService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ngOnInit(){
    let user = this.navParams.get('user');
    this.getExercises();
  }
  getExercises() {
    this.presentLoading();
    this.exercisesObservable = this.service.exercises()
      .subscribe(responce => {
        console.log('Responce: =>', responce);
        this.exercises = responce;
        this.dismissLoading();
      }, err => {
        this.dismissLoading();
        console.log('Err: =>', err);
      })
  }

  presentLoading(){
    if(!this.loading){
      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      try {
        this.loading.dismiss();
      }
      catch (exception) {
        console.log(exception)
      }
      this.loading = null;
    }
  }
  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ngOnDestroy() {
    if(this.exercisesObservable) {
      this.exercisesObservable.unsubscribe();
    }
    if(this.loading) {
      this.loading.dismiss();
    }
  }

}
