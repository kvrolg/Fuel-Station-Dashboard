import { Component, inject, ChangeDetectorRef  } from '@angular/core';
import { StationServicesService } from '../../station-services-service';
import { MatTableDataSource } from '@angular/material/table';
import { StationService } from '../../models/stationService.model';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatCardSubtitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSlideToggle, MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatIcon, MatCardSubtitle, MatProgressSpinner, MatSlideToggle],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private StationServices = inject(StationServicesService);
  private changeDetector = inject(ChangeDetectorRef);
  dataSource = new MatTableDataSource<StationService>();

  services$: Observable<StationService[]> = this.StationServices.getServices().pipe(tap((items) => this.dataSource.data =items));

  updateServiceCard(updatedService: StationService):void{
    const newTable = [...this.dataSource.data];
    const currentIndex = newTable.findIndex((index) => index.id === updatedService.id);
    if(currentIndex !== -1){
      newTable[currentIndex] = updatedService;
      this.dataSource.data = newTable;
      this.changeDetector.markForCheck();
    }
  }

  toggleChangeAvailability(id: number, event: MatSlideToggleChange): void{
    console.log(id)
    this.StationServices.updaterServicesAvailability(+id, event.checked).subscribe((updatedService: StationService) => this.updateServiceCard(updatedService));
  }

}
