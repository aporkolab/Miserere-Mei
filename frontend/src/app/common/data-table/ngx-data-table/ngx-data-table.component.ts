import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from 'src/app/model/user';

export interface INgxTableColumn {
  title: string;
  key: string;
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class NgxDataTableComponent<T extends Record<string, any>> implements OnInit {
  @Input() list: T[] = [];
  @Input() columns: INgxTableColumn[] = [];
  @Input() entity: string = '';

  @Output() selectOne: EventEmitter<T> = new EventEmitter<T>();
  @Output() deleteOne: EventEmitter<T> = new EventEmitter<T>();

  keys: Record<string, string> = {};
  phrase: string = '';
  filterKey: string = '';
  changeText = true;
  pageSize: number = 25;

  startSlice: number = 0;
  endSlice: number = this.pageSize;
  page: number = 1;

  user: User | null = null; // Tárolja az aktuális felhasználót

  get pageList(): number[] {
    const pageSize = Math.ceil(this.list.length / this.pageSize);
    return Array.from({ length: pageSize }, (_, i) => i + 1);
  }

  columnKey: string = '';
  sortDir: number = -1;

  constructor(
    private notifyService: NotificationService,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  get isAdmin(): boolean {
    return this.user?.role === 3;
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir *= -1;
  }

  onSelect(entity: T): void {
    this.selectOne.emit(entity);
  }

  onDelete(entity: T): void {
    if (this.isAdmin) {
      if (!confirm('Do you really want to delete this record? This process cannot be undone.')) {
        return;
      }
      this.deleteOne.emit(entity);
    } else {
      this.router.navigate(['forbidden']);
    }
  }

  jumptoPage(pageNum: number): void {
    this.page = pageNum;
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
  }

  showInfoAboutSorting(): void {
    this.notifyService.showInfo(
      'Click the icons next to the column titles to sort the entire table by this column.',
      'Miserere Mei v.1.0.0'
    );
  }
}
