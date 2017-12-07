import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import {TopnavbarService} from './topnavbar.service';
import {RequestService} from '../../../shared/request.service';
import {Router} from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html',
  providers: [TopnavbarService, RequestService]

})
export class TopNavbarComponent {
  public constructor(private topnavbarService: TopnavbarService, private router: Router,) {
  }
  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  public logout() {
    this.topnavbarService.logout().subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      }
    );
  }

}
