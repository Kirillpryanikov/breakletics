import {Component, ElementRef, ViewChild, OnChanges, SimpleChanges, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import {Platform, NavParams, ViewController, ModalController, NavController} from 'ionic-angular';
import Player from '@vimeo/player';
import { StatusBar } from '@ionic-native/status-bar';
import {
  ADLeyersComponent
} from '../index';
import {User} from "../../share/User";
import {AuthorizationService} from "../../share/authorization.service";

@Component({
  selector: 'wrapper-player',
  templateUrl: 'wrapper.vimeo.player.component.html',
  styleUrls: ['/wrapper.vimeo.player.component.scss'],
})
export class WrapperVideoPlayerComponent implements OnChanges, OnInit, OnDestroy {
  @Input('video') video: any;
  @ViewChild('iframe1') iFrameFirst: ElementRef;
  @ViewChild('iframe2') iFrameSecond: ElementRef;
  @ViewChild('nextbutton') buttonNext: ElementRef;

  private isPlay = true;
  private player;
  private videoParam;
  public user: User;
  constructor(private platform: Platform,
              private navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private viewController: ViewController,
              private statusBar: StatusBar,
              private modalCtrl: ModalController,
              private renderer: Renderer2,
              private navController: NavController,
              private userService: AuthorizationService) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.videoParam = this.navParams.get('video');
    this.statusBar.hide();
    this.user = this.userService.user.get();
    if(this.videoParam) {
      this.getVideo();
    }

    this.platform.backButton
      .subscribe(() => {
        this.close();
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.video) {
      this.getVideo();
    }
  }

  isAllowPlusmember(){
    if(this.user && this.user['plusmember'] === 0) {
      this.modalCtrl.create(ADLeyersComponent).present();
    }
  }

  getVideo() {
    // video = [190821442, 242763018];
    let video = this.videoParam.warm_up_url ?
      this.videoParam.warm_up_url.split('https://vimeo.com/')[1] :
      this.videoParam.video_url.split('https://vimeo.com/')[1];
    const options = {
      id: 'https://player.vimeo.com/video/' + video,
      width: this.platform.height(),
      height: this.platform.width(),
      autopause: false,
      controls: false,
      showinfo: false,
      portrait: false
    };
    this.player = new Player(this.iFrameFirst.nativeElement, options);
    const vm = this;

    this.player.ready().then(()=> {
      setTimeout(() => {
        vm.play();
      },10);
    });

    this.player.on('ended', (data)=> {
      this.next();
    });
  }

  play2(){
    const vm = this;
    if(!this.isPlay){
      this.player.ready().then(()=> {
        setTimeout(() => {
          vm.player.play();
          vm.isPlay = true;
        },1050);
      });
    } else {
      this.player.pause();
      vm.isPlay = false;
    }
  }

  play() {
    this.player.play();
  }

  getDuration() {
    this.player.getDuration()
      .then(duration => {
        return duration;
      })
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.unload();
  }

  next() {
    if(!this.videoParam.warm_up_url) {
      // this.modalCtrl.create(ADLeyersComponent).present();
      this.isAllowPlusmember();
      this.close();
      return;
    }

    this.iFrameFirst.nativeElement.remove();
    this.buttonNext.nativeElement.remove();
    const options = {
      id: 'https://player.vimeo.com/video/' + this.videoParam.video_url.split('https://vimeo.com/')[1] +'?autoplay=1',
      width: this.platform.width(),
      height: this.platform.height(),
      autopause: false,
      controls: false,
      showinfo: false
    };
    this.player = new Player(this.iFrameSecond.nativeElement, options);
    this.play();
    this.player.on('ended', (data)=> {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.isAllowPlusmember();
      // this.modalCtrl.create(ADLeyersComponent).present();
      this.close();
    });
  }

  close() {
    console.log('close video');
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    if(this.platform.is('ios')){
      this.statusBar.hide();
    } else {
      this.statusBar.show();
    }

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}

