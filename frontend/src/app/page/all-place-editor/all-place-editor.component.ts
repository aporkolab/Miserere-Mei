import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/model/place';
import { PlaceService } from 'src/app/service/place.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-all-place-editor',
  templateUrl: './all-place-editor.component.html',
  styleUrls: ['./all-place-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AllPlaceEditorComponent implements OnInit {
  allplace$!: Observable<Place>;
  allplace: Place = new Place();
  entity = 'allplace';

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        if (param['id'] && param['id'] !== '0') {
          this.allplace$ = this.placeService.getOne(param['id']);
          this.allplace$.subscribe({
            next: allplace => (this.allplace = allplace || new Place()),
          });
        }
      },
    });
  }

  onUpdate(allplace: Place) {
    this.placeService.update(allplace).subscribe({
      next: () => this.router.navigate(['/', 'allplace']),
      error: err => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(allplace: Place) {
    this.placeService.create(allplace).subscribe({
      next: () => this.router.navigate(['/', 'allplace']),
      error: err => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess('The place edited successfully!', 'Miserere Mei v.1.0.0');
  }

  showSuccessCreate() {
    this.notifyService.showSuccess('The place created successfully!', 'Miserere Mei v.1.0.0');
  }

  showError(err: any) {
    this.notifyService.showError('Something went wrong. Details: ' + err, 'Miserere Mei v.1.0.0');
  }
}
