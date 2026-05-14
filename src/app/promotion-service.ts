import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from './models/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private http = inject(HttpClient);
  url: string = "http://localhost:3000/promotions";

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(this.url);
  }
  getPromotionById(id: number): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.url}/${id}`);
  }
  createPromotion(promotion: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>(this.url, promotion)
  }
  updatePromotion(id: number, promotion: Promotion): Observable<Promotion>{
    return this.http.patch<Promotion>(`${this.url}/${id}`, promotion)
  }
  updateWholePromotion(id: number, promotion: Promotion): Observable<Promotion>{
    return this.http.put<Promotion>(`${this.url}/${id}`, promotion);
  }
  deletePromotion(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
