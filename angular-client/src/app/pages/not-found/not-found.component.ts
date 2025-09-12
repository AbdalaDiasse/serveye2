import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="mb-8">
          <mat-icon class="text-9xl text-gray-400 mb-4">error_outline</mat-icon>
          <h1 class="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div class="space-x-4">
          <button mat-raised-button color="primary" routerLink="/">
            <mat-icon>home</mat-icon>
            Go Home
          </button>
          <button mat-stroked-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Go Back
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFoundComponent {
  goBack(): void {
    window.history.back();
  }
}