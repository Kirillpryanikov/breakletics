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
        this.exercises = [];
        this.exercises = this.sortVideos(responce);
        console.log('responce ::: ', responce);
        console.log('this.exercises ::: ', this.exercises);
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

  sortVideos(videos) {
    let Toprocks = [];
    let Footworks = [];
    let Powermoves = [];
    let Crunches = [];
    let other = [];

    videos.forEach(video => {
      let isPush = false;

      for(let i = 0; i < video.tags.length - 1; i++) {
        switch (video.tags[i].name) {
          case 'BL Toprocks':
            Toprocks.push(video);
            isPush = true;
            break;
          case 'BL Footworks':
            Footworks.push(video);
            isPush = true;
            break;
          case 'BL Powermoves':
            Powermoves.push(video);
            isPush = true;
            break;
          case 'BL Crunches':
            Crunches.push(video);
            isPush = true;
            break;
        }
      }

      if(!isPush) {
        other.push(video);
      }
    });

    Toprocks.sort((a :any, b :any) => a.post_title == b.post_title ? 0 : +(a.post_title > b.post_title) || -1);
    Footworks.sort((a :any, b :any) => a.post_title == b.post_title ? 0 : +(a.post_title > b.post_title) || -1);
    Powermoves.sort((a :any, b :any) => a.post_title == b.post_title ? 0 : +(a.post_title > b.post_title) || -1);
    Crunches.sort((a :any, b :any) => a.post_title == b.post_title ? 0 : +(a.post_title > b.post_title) || -1);
    other.sort((a :any, b :any) => a.post_title == b.post_title ? 0 : +(a.post_title > b.post_title) || -1);

    return [].concat(Toprocks, Footworks, Powermoves, Crunches, other);
  }

  ngOnDestroy() {
    if(this.exercisesObservable) {
      this.exercisesObservable.unsubscribe();
    }
  }

}
