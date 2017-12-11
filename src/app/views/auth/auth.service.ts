import {Injectable} from '@angular/core';
import {RequestService} from '../../shared/request.service';
import {RequestMethod, RequestOptions, Http} from '@angular/http';
import {LinkLocalConfig} from '../../app.config';

@Injectable()
export class AuthService {
  private base_url = LinkLocalConfig.api_url;

  constructor(private req: RequestService, private http: Http) {
  }

  public login(username: string, password: string) {
    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.base_url + "/login",
      body: {"username": username, "password": password}
    });
    return this.http.request(options.url, options);
  }

  public register(username: string, email: string, password: string) {
    let options = new RequestOptions({
      method: RequestMethod.Post,
      url: this.base_url + "/register",
      body: {"username": username, "email": email, "password": password}
    });
    return this.http.request(options.url, options);
  }

}
