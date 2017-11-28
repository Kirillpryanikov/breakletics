import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'item-menu-side',
  templateUrl: 'item.menu.side.html',
  styleUrls: ['/item.menu.side.scss']
})
export class ItemMenuSide {

  public title: string = "Some page";

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {
      this.title = this.navParams.get('data');
  }

  close() {}
}
