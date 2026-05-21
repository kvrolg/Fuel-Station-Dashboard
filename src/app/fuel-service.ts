import { inject, Injectable } from '@angular/core';
import { FuelModel } from './models/fuel.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private http = inject(HttpClient);
  url: string = 'http://localhost:3000/fuels';
  private snackBar = inject(MatSnackBar);

  getFuels(): Observable<FuelModel[]> {
    return this.http.get<FuelModel[]>(this.url);
  }

  getAvailableFuels(): Observable<FuelModel[]> {
    return this.http
      .get<FuelModel[]>(this.url)
      .pipe(map((fuels) => fuels.filter((fuel) => fuel.available)));
  }

  updateFuelPrice(id: number, priceValue: number): Observable<FuelModel> {
    return this.http.patch<FuelModel>(`${this.url}/${id}`, { price: priceValue }).pipe(
      tap(() =>
        this.snackBar.open('Changed price successfully!', 'Dismiss', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'end',
        }),
      ),
      catchError((error) => {
        throw error;
      }),
    );
  }

  updateFuelAvailability(id: number, available: boolean): Observable<FuelModel> {
    return this.http.patch<FuelModel>(`${this.url}/${id}`, { available });
  }
}
