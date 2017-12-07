import { Injectable } from '@angular/core';
import { RequestService} from '../../../shared/request.service';
import { Response } from '@angular/http';
@Injectable()
export class TopnavbarService {
  constructor(private req: RequestService) {
  }
  public logout() {
    let body = {};
      return this.req.post("/logout",body).map((res: Response) => res.json());
  }
}
