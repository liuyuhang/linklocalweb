import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {LoginComponent} from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,

  ],
  exports: [
    LoginComponent
  ],
})

export class AuthModule {
}
