import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public static CONFIG = {
    url: 'http://breakletics.de/members/wp-json/',
  }
}
