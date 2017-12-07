import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,

  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
})

export class AuthModule {
}
