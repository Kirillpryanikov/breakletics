import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageComponent } from './login/login';
import { WelcomePageComponent } from './welcome/welcome';
import { RegisterPageComponent } from './register/register';
import { GuideComponent } from './guide/guide.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';

const components = [
  DashboardComponent,
  LoginPageComponent,
  WelcomePageComponent,
  RegisterPageComponent,
  GuideComponent
];

@NgModule({
  declarations: components,
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  entryComponents: components,
  providers: [
    LoginService,
    RegisterService
  ]
})

export class PageModule {}
