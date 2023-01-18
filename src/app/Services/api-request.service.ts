import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http:HttpClient) { }

  getRequest(url: string, data?: any): Observable<any>{
    const queryString = data ? Object.entries(data).map(param => {
      return `${param[0]}=${param[1]}`
    }).join('&') : "";

    const options = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.apiKey
      }),
    };

    return this.http.get<any>(`${url}?${queryString}`, options);
  }
}
