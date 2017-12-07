import {Component, ElementRef, ViewChild, OnChanges, SimpleChanges, Input, OnInit, OnDestroy } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import Player from '@vimeo/player';

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

  private player;
  private videoParam;

  constructor(private platform: Platform,
              private navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private viewController: ViewController) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.videoParam = this.navParams.get('video');
    console.log('warmup', this.navParams.get('video') );

    if(this.videoParam) {
      this.getVideo();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.video) {
      this.getVideo();
    }
  }

  getVideo() {
    // video = [190821442, 242763018];
    let video = this.videoParam.warm_up_url ?
      this.videoParam.warm_up_url.split('https://vimeo.com/')[1] +'?autoplay=1' :
      this.videoParam.video_url.split('https://vimeo.com/')[1] +'?autoplay=1'
    const options = {
      id: 'https://player.vimeo.com/video/' + video,
      width: this.platform.height(),
      height: this.platform.width(),
      autopause: false,
      controls: false,
      showinfo: false
    };
    this.player = new Player(this.iFrameFirst.nativeElement, options);
    this.play();
    this.player.on('ended', (data)=> {
      this.next();
    });
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
      this.close();
    });
  }

  close() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}

