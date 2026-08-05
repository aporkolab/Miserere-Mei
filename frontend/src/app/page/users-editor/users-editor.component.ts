import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class UsersEditorComponent implements OnInit {
  user$!: Observable<User>;
  user: User = new User();
  entity = 'Users';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        if (!param['id'] || param['id'] === '0') {
          this.user = new User(); // Új felhasználó létrehozásánál
        } else {
          this.user$ = this.userService.getOne(param['id']);
          this.user$.subscribe({
            next: user => (this.user = user),
          });
        }
      },
    });
  }

  onUpdate(user: User) {
    this.userService.update(user).subscribe({
      next: () => this.router.navigate(['/', 'users']),
      error: err => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(user: User) {
    this.userService.create(user).subscribe({
      next: () => this.router.navigate(['/', 'users']),
      error: err => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess(`${this.entity} edited successfully!`, 'Miserere Mei v.1.0.0');
  }

  showSuccessCreate() {
    this.notifyService.showSuccess(`${this.entity} created successfully!`, 'Miserere Mei v.1.0.0');
  }

  showError(err: string) {
    this.notifyService.showError('Something went wrong. Details: ' + err, 'Miserere Mei v.1.0.0');
  }
}
