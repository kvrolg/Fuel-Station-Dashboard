import { Component, inject, Pipe } from '@angular/core';
import { PromotionService } from '../../promotion-service';
import { Observable, tap } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AddNewPromotionComponent } from './add-new-promotion-component/add-new-promotion-component';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-promotions',
  imports: [AsyncPipe, DatePipe, MatTableModule, MatButton],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions {
  private promotionService = inject(PromotionService)
  private dialog = inject(MatDialog)
  keys: string[] = [ 'title','description','flag','range','badge','pointsReward']
  protected openModal(): void{
    this.dialog.open(AddNewPromotionComponent, {disableClose: true});
  }

  promotions$: Observable<Promotion[]> = this.promotionService.getPromotions().pipe(
    tap((items)=>{
      this.dataSource.data = items;
    })
  );
  dataSource = new MatTableDataSource<Promotion>();
}
