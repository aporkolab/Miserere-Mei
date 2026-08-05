import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class UsersComponent {
  columns = this.config.usersTableColumn;
  list$: Observable<User[]> = this.userService.getAll();
  entity = 'User';

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  // ngOnInit elhagyható, ha nincs más inicializálási logika
  // ngOnInit(): void {}

  showSuccessDelete() {
    this.notifyService.showSuccess(
      `${this.entity} deleted successfully!`, // Kisebb szövegjavítás
      'Miserere Mei v.1.0.0'
    );
  }

  showError(err: string) {
    this.notifyService.showError(
      'Something went wrong. Details: ' + err, // Szöveg formázás javítása
      'Miserere Mei v.1.0.0'
    );
  }

  onSelectOne(user: User): void {
    this.router.navigate(['/', 'users', 'select', user._id]);
  }

  onDeleteOne(user: User): void {
    this.userService.delete(user).subscribe({
      next: () => {
        this.list$ = this.userService.getAll(); // Frissítés azonnal
      },
      error: err => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }
}
