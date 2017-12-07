import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent,
    StarterViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule
  ],
  exports: [
    StarterViewComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}
