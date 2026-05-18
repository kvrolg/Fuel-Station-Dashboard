import { Component, inject } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PromotionService } from '../../../promotion-service';
import { Promotion } from '../../../models/promotion.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new-promotion-component',
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
  templateUrl: './add-new-promotion-component.html',
  styleUrl: './add-new-promotion-component.scss',
})
export class AddNewPromotionComponent {
  private dialogRef = inject(MatDialogRef);
  private promotionService = inject(PromotionService);
  private datePipe = inject(DatePipe);
  protected closeModal(): void {
    this.dialogRef?.close();
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

  submitApplication(): void {
    const path = this.applyForm.getRawValue();
    if (!path === undefined && !this.applyForm.valid) {
      return;
    }
    const newPromotion: Promotion = {
      id: Math.floor(Math.random() * 10),
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
    this.promotionService.createPromotion(newPromotion).subscribe((update) => {
      this.dialogRef?.close(update);
    });
  }
}
