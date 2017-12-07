import { Component, OnDestroy, OnInit, } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.template.html'
})
export class DashboardComponent implements OnDestroy, OnInit  {

public nav:any;

public constructor() {
  this.nav = document.querySelector('nav.navbar');
}

public ngOnInit():any {
  this.nav.className += " white-bg";
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
}

}
