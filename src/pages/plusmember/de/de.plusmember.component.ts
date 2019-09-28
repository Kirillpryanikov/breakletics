import {Component, OnInit, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {NavController, ViewController, Content} from 'ionic-angular';

@Component({
  selector: 'de-plusmember',
  templateUrl: 'de.plusmember.html',
  styleUrls: ['/de.plusmember.scss']
})
export class DePlusmemberComponent implements OnInit {
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
