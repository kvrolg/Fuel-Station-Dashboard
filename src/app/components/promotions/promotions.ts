import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import { PromotionService } from '../../promotion-service';
import { AddNewPromotionComponent } from './add-new-promotion-component/add-new-promotion-component';

@Component({
  selector: 'app-promotions',
  imports: [AsyncPipe, DatePipe, MatTableModule, MatButton],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions {
  private promotionService = inject(PromotionService);
  private dialog = inject(MatDialog);
  keys: string[] = ['title', 'description', 'flag', 'range', 'badge', 'pointsReward'];
  protected openModal(): void {
    const openedDialog = this.dialog.open(AddNewPromotionComponent, { disableClose: true });
    openedDialog.afterClosed().subscribe((row: Promotion) => this.updateTable(row));
  }

  updateTable(updatedRow: Promotion): void {
    const newTable = this.dataSource.data;
    this.dataSource.data = [...newTable, updatedRow];
  }

  promotions$: Observable<Promotion[]> = this.promotionService.getPromotions().pipe(
    tap((items) => {
      this.dataSource.data = items;
    }),
  );
  
  dataSource = new MatTableDataSource<Promotion>();
}
