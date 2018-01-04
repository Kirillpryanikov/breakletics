import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Content, NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'en-plusmember',
  templateUrl: 'en.plusmember.html',
  styleUrls: ['/en.plusmember.scss']
})
export class EnPlusmemberComponent implements OnInit {
  @ViewChild(Content) content: Content;
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

  scrollToBottom(){
    this.content.scrollToBottom(1000)
  }
}
