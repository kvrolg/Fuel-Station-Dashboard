import { Component, inject } from '@angular/core';
import { FuelService } from '../../../fuel-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatSelect, MatOption } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-change-price-component',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './change-price-component.html',
  styleUrl: './change-price-component.scss',
})
export class ChangePriceComponent {
  private dialogRef = inject(MatDialogRef, { optional: true });
  private fuelsList = inject(FuelService);
  arrayOfIndex = [0, 1, 2, 3, 4];

  fuelsTable: Array<string> = ['PB95', 'PB98', 'ON', 'ON Premium', 'LPG'];
  protected closeModal(): void {
    this.dialogRef?.close();
  }

  applyForm = new FormGroup({
    choosenFuel: new FormControl('', Validators.required),
    priceOfFuel: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });

  submitApplication(): void {
    if (this.applyForm.value.choosenFuel && this.applyForm.value.priceOfFuel) {
      this.fuelsList
        .updateFuelPrice(
          Number(this.applyForm.value.choosenFuel),
          +this.applyForm.value.priceOfFuel,
        )
        .subscribe((updatedFuel) => {
          this.dialogRef?.close(updatedFuel);
        });
    }
  }
}
