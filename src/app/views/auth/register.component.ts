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
  templateUrl: 'register.template.html',
  providers: [RequestService, AuthService]
})
export class RegisterComponent {
  constructor(private http: Http, private req: RequestService, private router: Router,
              private cookieservice: CookieService, private translate: TranslateService,
              private authservice: AuthService) {
  }

  ngOnInit() {
  }

  private base_url = LinkLocalConfig.api_url;
  public registerError = "";
  public nameOK = true;
  public emailOK = true;
  public passwordOK = true;
  public registerOK = true;

  register(username: string, email: string, password: string) {
    this.checkUsername(username);
    this.checkEmail(email);
    this.checkPassword(password, password);
    if (!(this.nameOK && this.emailOK && this.passwordOK)) {
      return;
    }
    this.cookieservice.put('token', "");
    this.authservice.register(username, email, password)
      .subscribe(
        res => {
          console.log(res.json());
          // 返回成功，设置变量token，user，language
          LinkLocalConfig.token = res.json().token['access_token'];
          LinkLocalConfig.user = res.json().token['User'];
          // 设置公用请求request的header token
          this.req.token = res.json().token['access_token'];
          // 设置浏览器cookie，以便页面刷新等情况的历史承接
          this.cookieservice.put('token', res.json().token['access_token']);
          this.cookieservice.put('user', res.json().token['User']);
          this.nameOK = true;
          this.emailOK = true;
          this.passwordOK = true;
          this.registerOK = true;
          this.registerError = "";
          // 跳转根目录
          this.router.navigate(['#/dashboard']);
        },
        err => {
          this.registerError = "Register Faild. " + err
          this.registerOK = false;
          console.error(err);
        }
      );

  }

  checkUsername(username: string) {
    if (username === "") {
      this.registerError = "Username can not be null";
      this.nameOK = false;
      return;
    }
    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.base_url + "/auth/checkusername",
      body: {"username": username}
    });
    this.http.request(options.url, options)
      .subscribe(
        res => {
          // console.log(res.json());
          this.nameOK = true;
        },
        err => {
          this.registerError = "Username already exist."
          this.nameOK = false;
          console.error(err);
        }
      );
  }

  checkEmail(email: string) {
    if (email === "") {
      this.registerError = "Email can not be null";
      this.emailOK = false;
      return;
    }
    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.base_url + "/auth/checkemail",
      body: {"email": email}
    });
    this.http.request(options.url, options)
      .subscribe(
        res => {
          // console.log(res.json());
          this.emailOK = true;
        },
        err => {
          this.registerError = "Email already exist."
          this.emailOK = false;
          console.error(err);
        }
      );
  }

  checkPassword(password1: string, password2: string) {
    if (password1 === password2) {
      this.passwordOK = true;
      this.registerError = "";
    } else {
      this.passwordOK = false;
      this.registerError = "Password not same.";
    }
  }

}
