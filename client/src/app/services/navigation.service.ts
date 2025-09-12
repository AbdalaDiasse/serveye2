import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentPageSubject = new BehaviorSubject<string>('dashboard');
  public currentPage$ = this.currentPageSubject.asObservable();

  constructor() { }

  setCurrentPage(page: string): void {
    this.currentPageSubject.next(page);
  }

  getCurrentPage(): string {
    return this.currentPageSubject.value;
  }
}