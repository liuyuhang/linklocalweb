import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http, Headers, URLSearchParams, RequestOptions, Request, RequestMethod} from "@angular/http";
import {Router} from "@angular/router";
import {LinkLocalConfig} from '../app.config';


@Injectable()
export class RequestService {
  public baseUrl: string;
  public token: string;

  constructor(public http: Http, public router: Router) {
    this.baseUrl = LinkLocalConfig.api_url;
    this.token = LinkLocalConfig.token;
  }

  get(path: string, params?: Object, withCredentials?: boolean): any {
    //验证token
    this.checkAuthorised();
    const url: string = this.baseUrl + path;
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'token': this.token
    });
    const searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }
    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Get,
      headers: headers,
      search: searchParams,
      withCredentials: withCredentials
    });
    const request = new Request(options);
    return this.makeRequest(request);
  }

  post(path: string, body?: Object, params?: Object, useDataProperty?: boolean, withCredentials?: boolean): any {
    //验证token
    this.checkAuthorised();

    const url: string = this.baseUrl + path;
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': this.token
    });
    const data = JSON.stringify(useDataProperty ? {data: body} : body);
    const searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }
    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Post,
      headers: headers,
      search: searchParams,
      body: data,
      withCredentials: withCredentials
    });
    const request = new Request(options);
    return this.makeRequest(request);
  }

  update(path: string, body?: Object, params?: Object, useDataProperty?: boolean, withCredentials?: boolean): any {
    //验证token
    this.checkAuthorised();

    const url: string = this.baseUrl + path;
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': this.token
    });
    const data = JSON.stringify(useDataProperty ? {data: body} : body);
    const searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }
    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Put,
      headers: headers,
      search: searchParams,
      body: data,
      withCredentials: withCredentials
    });
    const request = new Request(options);
    return this.makeRequest(request);
  }

  delete(path: string, params?: Object, withCredentials?: boolean): any {
    //验证token
    this.checkAuthorised();

    const url: string = this.baseUrl + path;
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'token': this.token
    });
    const searchParams = new URLSearchParams();
    for (let param in params) {
      searchParams.set(param, params[param]);
    }
    const options: RequestOptions = new RequestOptions({
      url: url,
      method: RequestMethod.Delete,
      headers: headers,
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
    return observable.catch(
      err => {
        if (err.status === 401) {
          return this.unantuorised();
        } else if (err.status === 403) {
          return this.forbidden();
        } else {
          return Observable.throw(err);
        }
      }
    );
  }

  unantuorised(): Observable<any> {
    console.log("unauthorised")
    this.token = ""
    this.router.navigate(['/login']);
    return Observable.empty();
  }

  forbidden(): Observable<any> {
    console.log("forbidden")
    this.router.navigate(['/']);
    return Observable.empty();
  }

  //验证token
  checkAuthorised(): void {
    if (this.token === "") {
      console.log('checkAuthorised');
      this.router.navigate(['/login']);
    }
  }


}
