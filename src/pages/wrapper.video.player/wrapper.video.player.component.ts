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
  @ViewChild('iframe') iFrame: ElementRef;

  private player;
  public data = {};
  constructor(private platform: Platform,
              private navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private viewController: ViewController) {}

  ngOnInit() {
    console.log(this.screenOrientation.type);
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
    video = 190821442;
    if(video) {
      const options = {
        id: 'https://player.vimeo.com/video/' + video +'?autoplay=1',
        width: this.platform.height(),
        height: this.platform.width(),
      };
      this.player = new Player(this.iFrame.nativeElement, options);
      this.play();
    }
  }

  play() {
    this.player.play();
  }

  getDuration() {
    this.player.getDuration()
      .then(duration => {
        this.data['duration'] = +(duration/60).toPrecision(4);
      })
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.unload();
  }

  ngOnDestroy() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}

