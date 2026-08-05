import { AllPlaceService } from './../../service/allplace.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlace } from 'src/app/model/allplace';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Place } from 'src/app/model/place';

@Component({
  selector: 'app-all-place-viewer',
  templateUrl: './all-place-viewer.component.html',
  styleUrls: ['./all-place-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AllPlaceViewerComponent implements OnInit {
  columns = this.config.placesTableColumns;
  list$: Observable<AllPlace[]> = this.allPlaceService.getAll();
  entity = 'allplace';

  constructor(
    private config: ConfigService,
    private allPlaceService: AllPlaceService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

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
