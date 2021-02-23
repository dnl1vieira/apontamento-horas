import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, retry, shareReplay } from 'rxjs/operators';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class PointServiceService {

  urlBase = BACKEND_URL + '/time-point';

  constructor(
    private http: HttpClient
  ) { }

  listAll(): Observable<any> {
    const url = this.urlBase + '/listAll';

    return this.http.get(url).pipe(
      retry(3),
      catchError(() => {
        return EMPTY;
      }), shareReplay()
    );

  }
}
