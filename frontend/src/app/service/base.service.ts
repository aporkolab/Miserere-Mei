import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id: string | number; [key: string]: unknown }> {
  apiUrl: string = environment.apiUrl;
  entity: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    private http: HttpClient,
    public config: ConfigService
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.entity}`);
  }

  getOne(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entity}/select/${id}`);
  }

  getOnePlace(location: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/place/${encodeURIComponent(location)}`);
  }

  create(entity: T): Observable<T> {
    const newEntity: Partial<T> = { ...entity };
    delete newEntity.id;
    return this.http.post<T>(`${this.apiUrl}/${this.entity}`, newEntity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${this.entity}/select/${entity.id}`, entity);
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entity}/${entity.id}`);
  }
}
