import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/model/place';
import { AllPlaceService } from 'src/app/service/allplace.service';
import { NotificationService } from 'src/app/service/notification.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-place-editor',
  templateUrl: './all-place-editor.component.html',
  styleUrls: ['./all-place-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, RouterLink, AsyncPipe],
})
export class AllPlaceEditorComponent implements OnInit {
  private allPlaceService = inject(AllPlaceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notifyService = inject(NotificationService);

  allplace$!: Observable<Place>;
  allplace: Place = new Place();
  entity = 'allplace';

  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        if (param['id'] && param['id'] !== '0') {
          this.allplace$ = this.allPlaceService.getOne(param['id']);
          this.allplace$.subscribe({
            next: allplace => (this.allplace = allplace || new Place()),
          });
        }
      },
    });
  }

  onUpdate(allplace: Place) {
    this.allPlaceService.update(allplace).subscribe({
      next: () => this.router.navigate(['/', 'allplace']),
      error: err => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(allplace: Place) {
    this.allPlaceService.create(allplace).subscribe({
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
