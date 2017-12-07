import {Component} from '@angular/core';
// new import
import {RequestService} from '../../shared/request.service';
import {Router} from "@angular/router";
import {RequestOptions, RequestMethod, Http} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import {TranslateService} from 'ng2-translate';
import {LinkLocalConfig} from '../../app.config';


@Component({
  templateUrl: 'register.template.html',
  providers: [RequestService]
})
export class RegisterComponent {
  constructor(private http: Http, private req: RequestService, private router: Router,
              private cookieservice: CookieService, private translate: TranslateService) {
  }

  ngOnInit() {
  }

  private base_url = LinkLocalConfig.api_url;
  public loginError;

}
