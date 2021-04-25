import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WORK_POSITIONS_API_ENDPOINT } from '@core/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkPositionsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllWorkPositions(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(WORK_POSITIONS_API_ENDPOINT)
      .pipe(map((resp: any) => resp.positions));
  }
}
