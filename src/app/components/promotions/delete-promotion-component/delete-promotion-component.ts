import { Component, inject } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../../../promotion-service';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar = inject(MatSnackBar);

  apply(): void {
    this.promotionService
      .deletePromotion(this.choosenRow.id)
      .subscribe((update) => this.dialogRef.close(update));
    this.snackBar.open('Removed promotion successfully!', 'Dismiss', {duration:3000, panelClass: ['snackbar-success'], horizontalPosition: 'end'});
  }

  protected closeModal(): void {
    this.dialogRef?.close();
  }
}
