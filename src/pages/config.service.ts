import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public static CONFIG = {
    url: 'http://bl-members-dev.yelpix.work/members/wp-json/',
    // url: 'http://breakletics.de/members/',
  }
}
