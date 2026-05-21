import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormMode } from '../../../models/form.model';
import { Promotion } from '../../../models/promotion.model';
import { PromotionService } from '../../../promotion-service';

@Component({
  selector: 'app-edit-promotion-component',
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    MatFormFieldModule,
    MatButton,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDateRangeInput,
    FormsModule,
    MatDateRangePicker,
    MatDateRangeInput,
    MatDatepickerModule,
  ],
  templateUrl: './edit-promotion-component.html',
  styleUrl: './edit-promotion-component.scss',
})
export class EditPromotionComponent implements OnInit {
  private dialogRef = inject(MatDialogRef);
  private promotionService = inject(PromotionService);
  private datePipe = inject(DatePipe);
  private editedRow = inject(MAT_DIALOG_DATA);

  @Input() mode: FormMode = 'add';
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.isEditMode = this.mode === 'edit';
    if (this.isEditMode) {
      this.applyForm.patchValue({
        title: this.editedRow.title,
        description: this.editedRow.description,
        type: this.editedRow.type,
        badge: this.editedRow.badge.toLowerCase(),
        pointsReward: this.editedRow.pointsReward,
        minPurchaseAmount: this.editedRow.minPurchaseAmount,
        isActive: !!this.editedRow.active,
        date: {
          start: this.editedRow.startDate,
          end: this.editedRow.endDate,
        },
      });
    }
  }

  applyForm = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    type: new FormControl<string>('', Validators.required),
    isActive: new FormControl<boolean>(false, Validators.required),
    badge: new FormControl<string>('', Validators.required),
    pointsReward: new FormControl<number>(0, [
      Validators.min(1),
      Validators.required,
      Validators.pattern(/^(?!(0))[0-9]+$/),
    ]),
    minPurchaseAmount: new FormControl<number>(0, [
      Validators.min(1),
      Validators.required,
      Validators.pattern(/^(?!(0))[0-9]+$/),
    ]),
    date: new FormGroup({
      start: new FormControl<string>('', Validators.required),
      end: new FormControl<string>('', [Validators.required]),
    }),
  });

  protected closeModal(): void {
    this.dialogRef?.close();
  }

  submitApplication(): void {
    const path = this.applyForm.getRawValue();
    if (!path && !this.applyForm.valid) {
      return;
    }
    const newPromotion: Promotion = {
      id: !this.isEditMode ? Math.floor(Math.random() * 10) : this.editedRow.id,
      title: path.title ?? '',
      description: path.description ?? '',
      active: path.isActive ?? false,
      type: path.type ?? '',
      startDate: this.datePipe.transform(path.date?.start?.toString() ?? '', 'yyyy-MM-dd') ?? '',
      endDate: this.datePipe.transform(path.date?.end?.toString() ?? '', 'yyyy-MM-dd') ?? '',
      badge: path.badge!.toUpperCase(),
      pointsReward: path.pointsReward ?? 0,
      minPurchaseAmount: path.minPurchaseAmount ?? 0,
    };

    if (this.isEditMode) {
      this.promotionService.updatePromotion(newPromotion.id, newPromotion).subscribe((update) => {
        this.dialogRef?.close(update);
      });
    } else {
      this.promotionService.createPromotion(newPromotion).subscribe((update) => {
        this.dialogRef?.close(update);
      });
    }
  }
}
