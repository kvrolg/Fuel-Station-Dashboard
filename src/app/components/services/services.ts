import { Component, inject } from '@angular/core';
import { StationServicesService } from '../../station-services-service';
import { MatTableDataSource } from '@angular/material/table';
import { StationService } from '../../models/stationService.model';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatCardSubtitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatIcon, MatCardSubtitle],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private StationServices = inject(StationServicesService);
  dataSource = new MatTableDataSource<StationService>()

  services$: Observable<StationService[]> = this.StationServices.getServices().pipe(tap((items) => this.dataSource.data =items))
}
