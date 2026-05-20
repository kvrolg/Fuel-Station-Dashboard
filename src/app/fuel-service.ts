import { inject, Injectable } from '@angular/core';
import { FuelModel } from './models/fuel.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private http = inject(HttpClient);
  url: string ="http://localhost:3000/fuels";

 getFuels(): Observable<FuelModel[]>{
    return this.http.get<FuelModel[]>(this.url)
  }

  getAvailableFuels(): Observable<FuelModel[]>{
    return this.http.get<FuelModel[]>(this.url).pipe(map(fuels => fuels.filter(fuel => fuel.available)))
  }
  
  updateFuelPrice(id: number, priceValue: number ): Observable<FuelModel>{
    return this.http.patch<FuelModel>(`${this.url}/${id}`, {price: priceValue})
  }

  updateFuelAvailability(id: number, available: boolean): Observable<FuelModel>{
    return this.http.patch<FuelModel>(`${this.url}/${id}`, {available})
  }
}
