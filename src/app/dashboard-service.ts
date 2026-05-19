import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from './models/station.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  url: string = "http://localhost:3000/station";

  getStation(): Observable<Station[]>{
    return this.http.get<Station[]>(this.url);
  }
}
