import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { GuideComponent } from '../guide/guide.component';
import { WelcomePageComponent } from '../welcome/welcome';
import { DashbordService } from './dashboard.service';
import { VideoWeekInterface } from '../interfaces/VideoWeekInterface';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  private loading: any;
  public user: object;
  public video: VideoWeekInterface;
  private videoWeekObservable: Subscription;
  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: DashbordService) {

    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    this.getUser();
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.video = res;
      console.log('res video', this.video);
    }, err => {
      console.log('err video', err);
    });
  }
  /**
   * get user from storage
   */
  getUser() {
    this.user = this.nativeStorage.getItem('user')
      .then(res => {
        console.log('GET ngOnInit res', res);
        this.user = res;
        this.presentGuideModal(this.user)
      })
      .catch(err => {
        console.log('Error ngOnInit component --> ', err);
        this.user = this.navParams.get('user');
        this.presentGuideModal(this.user)
      });
  }

  logout() {
    this.loading.present();

    this.nativeStorage.remove('user')
      .then(res => {
        this.navCtrl.setRoot(WelcomePageComponent);
        this.loading.dismiss();
      })
      .catch(err => {
        this.loading.dismiss();
      })
  }

  presentGuideModal(user) {
    this.nativeStorage.getItem('guide')
      .then(res => {
        console.log('GET guide res', res);
        if(!res || res !== this.user['id']){
          this.modalCtrl.create(GuideComponent, {user: user}).present();
        }
      })
      .catch(err => {
        console.log('ERRR guide---> ', err);
        this.modalCtrl.create(GuideComponent,{user: user}).present();
      })
  }

  getGuide() {
    this.modalCtrl.create(GuideComponent).present();
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
  }
}
