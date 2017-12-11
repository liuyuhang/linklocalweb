import {Component} from '@angular/core';
// new import
import {RequestService} from '../../shared/request.service';
import {Router} from "@angular/router";
import {RequestOptions, RequestMethod, Http} from '@angular/http';
import {CookieService} from 'ngx-cookie';
import {TranslateService} from 'ng2-translate';
import {LinkLocalConfig} from '../../app.config';
import {AuthService} from './auth.service';


@Component({
  templateUrl: 'login.template.html',
  providers: [RequestService, AuthService]
})
export class LoginComponent {
  constructor(private http: Http, private req: RequestService, private router: Router,
              private cookieservice: CookieService, private translate: TranslateService,
              private authservice: AuthService) {
  }

  ngOnInit() {
  }


  public loginError = "Incorrect username/email or password.";
  public errorHidden= true;


  login(username: string, password: string) {

    this.cookieservice.put('token', "");
    this.authservice.login(username, password)
      .subscribe(
        res => {
          if (res.json().status === 401) {
            this.loginError = "Authorization Faild";
            this.errorHidden = false;
            return;
          }
          console.log(res.json());
          //返回成功，设置变量token，user，language
          LinkLocalConfig.token = res.json().token['access_token'];
          LinkLocalConfig.user = res.json().token['User'];
          //设置公用请求request的header token
          this.req.token = res.json().token['access_token'];
          //设置浏览器cookie，以便页面刷新等情况的历史承接
          this.cookieservice.put('token', res.json().token['access_token']);
          this.cookieservice.put('user', res.json().token['User']);
          this.errorHidden = true;
          //跳转根目录
          this.router.navigate(['/']);
        },
        err => {
          this.loginError = JSON.parse(err._body).error;
          this.errorHidden = false;
          console.error(err);
        }
      );
  }

}
