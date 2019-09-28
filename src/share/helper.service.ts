import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {LoadingController} from "ionic-angular";

@Injectable()
export class HelperService {
  private _loading: any;

  constructor(
              private loadingCtrl: LoadingController) {
  }

  /**
   * Loading spinner for controllers
   */

  loading = {
    that: this,
    show() {
      console.log('presentLoading :: ',this.that._loading, this, this);
      if(!this.that._loading){
        this.that._loading = this.that.loadingCtrl.create({
          spinner: 'crescent',
          duration: 3000
        });
        this.that._loading.present();
      }
    },
    hide() {
      if (this.that._loading) {
        try {
          this.that._loading.dismiss();
        }
        catch (exception) {
        }
        this.that._loading = null;
      }
    }
  }
}
