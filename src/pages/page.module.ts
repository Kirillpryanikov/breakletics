import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StatusBar } from '@ionic-native/status-bar';


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
  ItemMenuSide,
  FilterVideoComponent,
  VideoListComponent,
  PayItComponent,
  SettingsComponent,
  AccountComponent,
  PasswordRestoreComponent,
  DeAgbComponent,
  AgbComponent,
  ImprintComponent,
  DeImprintComponent,
  EnImprintComponent,
  ADLeyersComponent,
  DeADLeyersComponent,
  EnADLeyersComponent,
  PlusmemberComponent,
  DePlusmemberComponent,
  EnPlusmemberComponent
} from './index';

import { RegisterService } from './register/register.service';
import { DashbordService } from './dashboard/dashboard.service';
import { ExtraQuestionsService } from './extra.questions/extra.qustetions.service';
import { ConfigService } from './config.service';
import { WorkoutService } from './workout/workout.service';
import { ExercisesService } from './exercises/exercises.service';
import { WarmupService } from './warmup/warmup.service';
import { VideoListService } from "./video.list/video.list.service";
import { Keyboard } from '@ionic-native/keyboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthorizationService } from './../share/Authorization.service';
import { PlusmemberService } from './plusmember/plusmember.service';

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
  ItemMenuSide,
  FilterVideoComponent,
  VideoListComponent,
  PayItComponent,
  SettingsComponent,
  AccountComponent,
  PasswordRestoreComponent,
  DeAgbComponent,
  AgbComponent,
  ImprintComponent,
  DeImprintComponent,
  EnImprintComponent,
  ADLeyersComponent,
  DeADLeyersComponent,
  EnADLeyersComponent,
  PlusmemberComponent,
  DePlusmemberComponent,
  EnPlusmemberComponent
];

@NgModule({
  declarations: components,
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  entryComponents: components,
  providers: [
    RegisterService,
    ExtraQuestionsService,
    ConfigService,
    DashbordService,
    WorkoutService,
    ExercisesService,
    WarmupService,
    VideoListService,
    Keyboard,
    StatusBar,
    InAppBrowser,
    AuthorizationService,
    PlusmemberService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PageModule {}
