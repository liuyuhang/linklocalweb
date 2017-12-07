import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Headers, URLSearchParams, RequestOptions, Request, RequestMethod} from '@angular/http';
import {Router} from '@angular/router';
import {LinkLocalConfig} from '../app.module';

/*
* 本模块为公用请求模块，请求过程中自带验证信息token
* 要求除去login和logout信息不适用此方法，其他请求均由此服务请求
* 当前调用方式有get和post两种，传参请详见各函数说明
* */

@Injectable()
export class RequestService {
  private baseUrl: string;
  public token: string;

  constructor(public http: Http,
              public router: Router) {
    this.baseUrl = LinkLocalConfig.api_url;
    this.token = LinkLocalConfig.token;
  }

  get(path: string, params?: Object, withCredentials?: boolean): any {
    this.checkAuthorised();

    const url: string = this.baseUrl + path;
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'token': this.token
    });

    const searchParams = new URLSearchParams();

    for (let param in params) searchParams.set(param, params[param]);

    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Get,
      headers: headers,
      search: searchParams,
      withCredentials: withCredentials
    });
    const request = new Request(options);
    return this.makeRequest(request)
  }

  post(path: string, body?: Object, params?: Object, useDataProperty?: boolean, withCredentials?: boolean): any {
    this.checkAuthorised();

    const url: string = this.baseUrl + path;

    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': this.token
    });

    const data = JSON.stringify(useDataProperty ? {data: body} : body);

    const searchParams = new URLSearchParams();

    for (let param in params) searchParams.set(param, params[param]);

    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Post,
      headers: headers,
      body: data,
      search: searchParams,
      withCredentials: withCredentials
    });

    const request = new Request(options);

    return this.makeRequest(request);
  }


  makeRequest(request: Request) {
    return this.intercept(this.http.request(request));
  }

  intercept(observable: Observable<any>) {
    return observable.catch(err => {

      if (err.status === 401) {
        return this.unauthorised();

      } else if (err.status === 403) {
        return this.forbidden();
      } else {
        return Observable.throw(err);
      }
    });
  }

  unauthorised(): Observable<any> {
    console.log('unauthorised')
    this.token = ''
    this.router.navigate(['/login']);
    return Observable.empty();
  }

  forbidden(): Observable<any> {
    console.log('forbidden')
    this.router.navigate(['/']);
    return Observable.empty();
  }

  checkAuthorised(): void {
    if (this.token == '') {
      console.log('checkAuthorised')
      this.router.navigate(['/login']);
    }
  }


}
