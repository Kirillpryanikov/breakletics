import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'en-plusmember',
  templateUrl: 'en.plusmember.html',
  styleUrls: ['/en.plusmember.scss']
})
export class EnPlusmemberComponent implements OnInit {
  @Input() testimonials: any[];
  @Input() benefits: any[];
  @Output() goToLink = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
  ) {}

  ngOnInit(){
  }

  close() {
    this.viewCtrl.dismiss();
  }

  open(link){
    this.goToLink.emit(link);
  }

}
