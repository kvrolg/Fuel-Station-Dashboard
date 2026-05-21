import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, tap } from 'rxjs';
import { Promotion } from './models/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private http = inject(HttpClient);
  url: string = 'http://localhost:3000/promotions';
  private snackBar = inject(MatSnackBar);

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.url);
  }

  getPromotionById(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.url}/${id}`);
  }

  getActivePromotions(): Observable<Promotion[]> {
    return this.http
      .get<Promotion[]>(this.url)
      .pipe(map((fuels) => fuels.filter((fuel) => fuel.active)));
  }

  createPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.url, promotion).pipe(
      tap(() =>
        this.snackBar.open('Added new promotion successfully!', 'Dismiss', {
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

  updatePromotion(id: number, promotion: Promotion): Observable<Promotion> {
    return this.http.patch<Promotion>(`${this.url}/${id}`, promotion).pipe(
      tap(() =>
        this.snackBar.open('Edited promotion successfully!', 'Dismiss', {
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

  replacePromotion(id: number, promotion: Promotion): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.url}/${id}`, promotion);
  }

  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() =>
        this.snackBar.open('Removed promotion successfully!', 'Dismiss', {
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
}
