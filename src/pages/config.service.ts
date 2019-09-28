import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public static CONFIG = {
    url: 'http://breakletics.de/members/wp-json/',
    payUrl: 'https://www.digistore24.com/product/92793'
  };

  public static LEVELS = ["Beginner", "Advanced", "Expert"];
}
