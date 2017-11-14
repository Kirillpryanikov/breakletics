import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home/home';
import { ListPage } from './list/list';
import { LoginPageComponent } from './login/login';
import { WelcomePageComponent } from './welcome/welcome';
import { RegisterPageComponent } from './register/register';

const components = [
  HomePage,
  ListPage,
  LoginPageComponent,
  WelcomePageComponent,
  RegisterPageComponent
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
