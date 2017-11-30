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

  constructor(private platform: Platform,
              private navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private viewController: ViewController) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    const video = this.navParams.get('video');

    if(video) {
      this.getVideo(video);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.video) {
      this.getVideo(changes.video);
    }
  }

  getVideo(video) {
    // video = [190821442, 242763018];
    if(video) {
      const options = {
        id: 'https://player.vimeo.com/video/' + video +'?autoplay=1',
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
    this.iFrameFirst.nativeElement.remove();
    this.buttonNext.nativeElement.remove();
    const options = {
      id: 'https://player.vimeo.com/video/' + 190821442 +'?autoplay=1',
      width: this.platform.width(),
      height: this.platform.height(),
      autopause: false,
      controls: false,
      showinfo: false
    };
    this.player = new Player(this.iFrameSecond.nativeElement, options);
    this.play();
  }

  close() {
    this.viewController.dismiss();
  }

  ngOnDestroy() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}

