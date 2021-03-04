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

  urlBase = BACKEND_URL;

  constructor(
    private http: HttpClient
  ) { }

  listAll(page: number = 0,
    size: number = 5,
    filters): Observable<any> {

    let params = new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      
    params = params.set('dateFrom', filters.start || '');
    params = params.set('dateTo', filters.end || '');

    const url = this.urlBase + 'api/time-point/findAll';
    return this.http.get(url, { responseType: 'json', params }).pipe(
      retry(3),
      catchError(() => {
        return EMPTY;
      }), shareReplay()
    );

  }

  create(result): Observable<any> {
    const url = this.urlBase + 'api/time-point/saveOrUpdate';

    return this.http.post(url, result, { responseType: 'text' });
  }

  delete(value): Observable<any> {
    const url = this.urlBase + 'api/time-point/delete';
    return this.http.delete(url + '/' + value.id, { responseType: 'text' });
  }
}
