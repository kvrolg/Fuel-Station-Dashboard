import { Component, DestroyRef, inject } from '@angular/core';
import { MatAnchor, MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../../../promotion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-promotion-component',
  imports: [MatAnchor, MatButton, MatButtonModule],
  templateUrl: './delete-promotion-component.html',
  styleUrl: './delete-promotion-component.scss',
})
export class DeletePromotionComponent {
  private dialogRef = inject(MatDialogRef);
  private promotionService = inject(PromotionService);
  private destroyRef = inject(DestroyRef);
  private choosenRow = inject(MAT_DIALOG_DATA);

  apply(): void {
    this.promotionService
      .deletePromotion(this.choosenRow.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((update) => this.dialogRef.close(update));
  }

  protected closeModal(): void {
    this.dialogRef?.close();
  }
}
