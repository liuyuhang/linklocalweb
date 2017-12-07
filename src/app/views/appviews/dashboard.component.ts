import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {RequestService} from '../../shared/request.service';

@Component({
  templateUrl: 'dashboard.template.html',
  providers: [DashboardService, RequestService]
})
export class DashboardComponent implements OnDestroy, OnInit {

  public apiVersion: string;

  public nav: any;

  public constructor(private dashboardService: DashboardService) {
    this.nav = document.querySelector('nav.navbar');

  }

  public ngOnInit(): any {
    this.nav.className += " white-bg";
    this.getApiVersion();
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  public getApiVersion() {
    this.dashboardService.getApiVersion().subscribe(
      res => {
        this.apiVersion = res;
        console.log(this.apiVersion);
      }
    );
  }


}
