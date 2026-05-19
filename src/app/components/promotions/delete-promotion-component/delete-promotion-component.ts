import { Component, inject } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../../../promotion-service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-promotion-component',
  imports: [MatAnchor, MatButton, MatButtonModule],
  templateUrl: './delete-promotion-component.html',
  styleUrl: './delete-promotion-component.scss',
})
export class DeletePromotionComponent {
  private dialogRef = inject(MatDialogRef);
  private promotionService = inject(PromotionService);
  private choosenRow = inject(MAT_DIALOG_DATA);

  Apply() {
    this.promotionService
      .deletePromotion(this.choosenRow.id)
      .subscribe((update) => this.dialogRef.close(update));
  }

  protected closeModal(): void {
    this.dialogRef?.close();
  }
}
