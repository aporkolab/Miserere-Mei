import { AllPlaceService } from './../../service/allplace.service';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlace } from 'src/app/model/allplace';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Place } from 'src/app/model/place';
import { NgxDataTableComponent } from '../../common/data-table/ngx-data-table/ngx-data-table.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-place-viewer',
  templateUrl: './all-place-viewer.component.html',
  styleUrls: ['./all-place-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgxDataTableComponent, AsyncPipe],
})
export class AllPlaceViewerComponent implements OnInit {
  private config = inject(ConfigService);
  private allPlaceService = inject(AllPlaceService);
  private router = inject(Router);
  private notifyService = inject(NotificationService);

  columns = this.config.placesTableColumns;
  list$: Observable<AllPlace[]> = this.allPlaceService.getAll();
  entity = 'allplace';

  ngOnInit(): void {}

  loadPlaces(): void {
    this.list$ = this.allPlaceService.getAll();
  }

  showSuccessDelete() {
    this.notifyService.showSuccess(`${this.entity} deleted successfully!`, 'Miserere Mei v.1.0.0');
  }

  showError(err: string) {
    this.notifyService.showError('Something went wrong. Details: ' + err, 'Miserere Mei v.1.0.0');
  }

  onSelectOne(allPlace: AllPlace): void {
    this.router.navigate(['/allplace', 'select', allPlace.id]);
  }

  onDeleteOne(allPlace: AllPlace): void {
    this.allPlaceService.delete(allPlace).subscribe({
      next: () => this.loadPlaces(),
      error: err => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }
}
