import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { DashboardComponent, WorkoutFilterComponent } from '../index'

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
  styleUrls: ['/workout.scss']
})
export class WorkoutComponent implements OnInit {
  private loading: any;
  private tabBarElement: any;
  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams) {
    this.loading = this.loadingCtrl.create({});
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    console.log('GET tabs', this.tabBarElement);
  }

  ngOnInit(){
    let user = this.navParams.get('user');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  goToDash() {
    this.navCtrl.setRoot(DashboardComponent);
  }

  getFilters() {
    this.modalCtrl.create(WorkoutFilterComponent).present();
  }
}
