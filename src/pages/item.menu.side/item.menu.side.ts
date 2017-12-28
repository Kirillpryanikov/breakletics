import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'item-menu-side',
  templateUrl: 'item.menu.side.html',
  styleUrls: ['/item.menu.side.scss']
})
export class ItemMenuSide implements OnInit {

  public title: string = "Some page";

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {
      this.title = this.navParams.get('data');
  }
  ngOnInit(){
  }
  close() {}
}
