import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-new-promotion-component',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatButton,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    // MatDateRangeInput,
    FormsModule,
    MatDateRangePicker,
    MatDateRangeInput,
    MatDatepickerModule
],
  templateUrl: './add-new-promotion-component.html',
  styleUrl: './add-new-promotion-component.scss',
})
export class AddNewPromotionComponent {
  private dialogRef = inject(MatDialogRef);
  protected closeModal(): void {
    this.dialogRef?.close();
  }
  applyForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
    isActive: new FormControl(false, Validators.required),
    badge: new FormControl('', Validators.required),
    pointsReward: new FormControl('', [Validators.min(1), Validators.required]),
    minPurchaseAmount: new FormControl('', [Validators.min(1), Validators.required]),
    date: new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', [Validators.required])
    })
  });

  submitApplication(): void {
    console.log(this.applyForm.value);
  }
}
