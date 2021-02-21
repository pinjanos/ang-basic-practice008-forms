import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  apiUrl: string = 'http://localhost:3000/events';

  constructor(
    private http: HttpClient,
    ) { }

  getAll(): void {
    this.http.get<Event[]>(this.apiUrl).subscribe(events => this.list$.next(events));
  }
  
  create(event: Event): void {
    this.http.post<Event>(this.apiUrl, event).subscribe(
    () => this.getAll()
    );
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    
    if (id===0) {
      return of(new Event());
    }
    return this.http.get<Event>(`${this.apiUrl}/${id}`);    
  }

  update(event: Event): void {
    this.http.patch<Event>(`${this.apiUrl}/${event.id}`, event).subscribe(
      () => this.getAll()
    );
  }
  
  remove(event: Event): void {
    this.http.delete<Event>(`${this.apiUrl}/${event.id}`).subscribe(
      () => this.getAll()
    );
  }


}
