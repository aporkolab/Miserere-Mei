import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ContactComponent {
  sending = false;
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    subject: ['', [Validators.required, Validators.maxLength(160)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(5000)]],
    website: [''],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly notifications: NotificationService
  ) {}

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.sending) return;
    this.sending = true;
    this.http
      .post(`${environment.apiUrl}/contact`, this.form.getRawValue())
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: () => {
          this.form.reset();
          this.notifications.showSuccess('Az üzenetet biztonságosan továbbítottam.', 'Kapcsolat');
        },
        error: () =>
          this.notifications.showError(
            'Az üzenet most nem küldhető el. Próbáld újra később.',
            'Kapcsolat'
          ),
      });
  }
}
