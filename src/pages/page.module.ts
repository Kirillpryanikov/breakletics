import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home/home';
import { ListPage } from './list/list';
import { AuthorizationPageComponent } from './authorization/authorization';

const components = [
  HomePage,
  ListPage,
  AuthorizationPageComponent
];

@NgModule({
  declarations: components,
  imports: [
    IonicModule
  ],
  entryComponents: components,
  providers: []
})
export class PageModule {}
