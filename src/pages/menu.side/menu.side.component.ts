import { Component, OnInit } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'menu-side-component',
  templateUrl: 'menu.side.html',
  styleUrls: ['/menu.side.scss']
})
export class MenuSideComponent implements OnInit {

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              private navParams: NavParams) {}

  ngOnInit(){}

}
