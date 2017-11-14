import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home/home';
import { ListPage } from './list/list';
import { LoginPageComponent } from './login/login';
import { WelcomePageComponent } from './welcome/welcome';

const components = [
  HomePage,
  ListPage,
  LoginPageComponent,
  WelcomePageComponent
];

@NgModule({
  declarations: components,
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  entryComponents: components,
  providers: []
})

export class PageModule {}
