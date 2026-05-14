import { Component, inject } from '@angular/core';
import { PromotionService } from '../../promotion-service';
import { Observable } from 'rxjs';
import { FuelModel } from '../../models/fuel.model';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions {
  private promotionService = inject(PromotionService)

  promotions$: Observable<Promotion[]> = this.promotionService.getPromotions();

  onClick(): void{
    console.log(this.promotions$)
  }
}
