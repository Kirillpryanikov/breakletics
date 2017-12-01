import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import {
  LoginPageComponent,
  DashboardComponent,
  TabsComponent,
  RegisterPageComponent,
  WelcomePageComponent,
  GuideComponent,
  WorkoutComponent,
  ExtraQuestionsComponent,
  ExercisesComponent,
  WarmupComponent,
  MenuSideComponent,
  WrapperVideoPlayerComponent,
  WorkoutFilterComponent,
  ItemMenuSide,
  FilterVideoComponent
} from './index';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { DashbordService } from './dashboard/dashboard.service';
import { ExtraQuestionsService } from './extra.questions/extra.qustetions.service';
import { ConfigService } from './config.service';
import { WorkoutService } from './workout/workout.service';

const components = [
  DashboardComponent,
  LoginPageComponent,
  WelcomePageComponent,
  RegisterPageComponent,
  GuideComponent,
  ExtraQuestionsComponent,
  TabsComponent,
  WorkoutComponent,
  ExercisesComponent,
  WarmupComponent,
  MenuSideComponent,
  WrapperVideoPlayerComponent,
  WorkoutFilterComponent,
  ItemMenuSide,
  FilterVideoComponent
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
    RegisterService,
    ExtraQuestionsService,
    ConfigService,
    DashbordService,
    WorkoutService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PageModule {}
