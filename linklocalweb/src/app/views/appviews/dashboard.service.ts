import { Injectable } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Response } from '@angular/http';
@Injectable()
export class DashboardService {
  constructor(private req: RequestService) {
  }
  public getApiVersion() {
    return this.req.get("/").map((res: Response) => res.json());
  }
}
