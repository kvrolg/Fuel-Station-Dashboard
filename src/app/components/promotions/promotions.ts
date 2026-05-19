import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { Promotion } from '../../models/promotion.model';
import { PromotionService } from '../../promotion-service';
import { AddNewPromotionComponent } from './add-new-promotion-component/add-new-promotion-component';
import { EditPromotionComponent } from './edit-promotion-component/edit-promotion-component';
import { DeletePromotionComponent } from './delete-promotion-component/delete-promotion-component';

@Component({
  selector: 'app-promotions',
  imports: [
    AsyncPipe,
    DatePipe,
    MatTableModule,
    MatButton,
    MatIconModule,
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './promotions.html',
  styleUrl: './promotions.scss',
})
export class Promotions {
  private promotionService = inject(PromotionService);
  private dialog = inject(MatDialog);
  keys: string[] = ['title', 'description', 'flag', 'range', 'badge', 'pointsReward', 'action'];

  protected openModal(): void {
    const openedDialog = this.dialog.open(AddNewPromotionComponent, { disableClose: true });
    openedDialog.afterClosed().subscribe((row: Promotion) => this.updateTable(row));
  }

  protected openEditModal(element: Promotion): void {
    const openedDialog = this.dialog.open(EditPromotionComponent, {
      disableClose: true,
      data: element,
    });
    openedDialog.afterClosed().subscribe((row: Promotion) => this.editRowInTable(row));
  }

  protected openDeleteModal(element: Promotion): void {
    const openedDialog = this.dialog.open(DeletePromotionComponent, {
      disableClose: true,
      data: element,
    });
    openedDialog.afterClosed().subscribe((row: Promotion) => this.deleteRowInTable(row));
  }

  editRowInTable(updatedRow: Promotion): void {
    if (!updatedRow) {
      return;
    }
    const newTable = this.dataSource.data;
    const currentIndex = newTable.findIndex((tableRow) => tableRow.id === updatedRow.id);
    if (currentIndex !== -1) {
      newTable[currentIndex] = updatedRow;
      this.dataSource.data = [...newTable];
    }
  }

  updateTable(updatedRow: Promotion): void {
    if (!updatedRow) {
      return;
    }
    const newTable = this.dataSource.data;
    this.dataSource.data = [...newTable, updatedRow];
  }

  deleteRowInTable(updatedRow: Promotion): void {
    if (!updatedRow) {
      return;
    }
    const newTable = this.dataSource.data;
    this.dataSource.data = newTable.filter((promotion) => promotion.id !== updatedRow.id);
  }

  promotions$: Observable<Promotion[]> = this.promotionService.getPromotions().pipe(
    tap((items) => {
      this.dataSource.data = items;
    }),
  );

  dataSource = new MatTableDataSource<Promotion>();
}
