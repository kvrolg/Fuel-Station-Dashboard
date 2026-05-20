import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationService } from './models/stationService.model';

@Injectable({
  providedIn: 'root',
})
export class StationServicesService {
  private http = inject(HttpClient);
  url: string = 'http://localhost:3000/services';

  getServices(): Observable<StationService[]>{
    return this.http.get<StationService[]>(this.url);
  }
}
