import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class ExtractService {

  constructor(private http: HttpClient) { }
  
  downloadFile(dateFrom, dateTo): Observable<any> {
    const url = BACKEND_URL + 'api/time-point/download-file';

    let params = new HttpParams()
    .set("dateFrom", dateFrom)
    .set("dateTo", dateTo)

    return this.http.get(url, { responseType: 'text', params });
  }

}
