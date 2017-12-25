import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';
import {ExercisesService} from './exercises.service';
import {Video} from "../../share/Video";
import {HelperService} from "../../share/helper.service";

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
  styleUrls: ['/exercises.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  private exercisesObservable: Subscription;
  private exercises: Video[];
  private tabBarElement;

  constructor(public navCtrl: NavController,
              private helper: HelperService,
              private service: ExercisesService) {
    // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ngOnInit(){
    this.getExercises();
  }

  getExercises() {
    this.helper.loading.show();
    this.exercisesObservable = this.service.exercises()
      .subscribe(responce => {
        this.exercises = responce;
        this.helper.loading.hide();
      }, err => {
        this.helper.loading.hide();
        console.log('Err: =>', err);
      })
  }

  // ionViewWillEnter() {
  //   this.tabBarElement.style.display = 'none';
  // }
  //
  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  // }

  ngOnDestroy() {
    if(this.exercisesObservable) {
      this.exercisesObservable.unsubscribe();
    }
  }

}
