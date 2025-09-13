import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationService } from '../../services/navigation.service';
import { EventSummaryComponent } from '../sections/event-summary/event-summary.component';
import { ControlPanelComponent } from '../sections/control-panel/control-panel.component';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    EventSummaryComponent,
    ControlPanelComponent
  ],
  template: `
    <div class="flex w-full min-h-screen bg-white border-2 border-solid border-gray-300">
      <div class="flex w-full bg-gradient-to-r from-slate-50 to-blue-50">
        <div class="flex w-full">
          <app-event-summary 
            [currentPage]="currentPage" 
            (pageChange)="onPageChange($event)">
          </app-event-summary>
          <div class="flex-1">
            <ng-container [ngSwitch]="currentPage">
              <app-control-panel *ngSwitchCase="'dashboard'"></app-control-panel>
              <div *ngSwitchCase="'capture'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Capture Page</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'reconnaissance'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Reconnaissance Page</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'persons'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Persons Dashboard</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'personnesDashboard'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Personnes Dashboard</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'events'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Events Page</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vehicles'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Vehicles Dashboard</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vehicleCapture'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Vehicle Capture</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'clientAnalysis'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">Client Analysis</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vssAgent'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">VSS Agent</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vssSummarize'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">VSS Resume</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vssSearch'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">VSS Search</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vssAlerts'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">VSS Alerts</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchCase="'vssQA'" class="p-6">
                <h1 class="text-2xl font-bold mb-4">VSS Q/A</h1>
                <p>Page en cours de développement...</p>
              </div>
              <div *ngSwitchDefault>
                <app-control-panel></app-control-panel>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `]
})
export class FrameComponent implements OnInit {
  currentPage: string = 'dashboard';
  private navigationService = inject(NavigationService);

  constructor() {}

  ngOnInit(): void {
    // Subscribe to navigation state changes
    this.navigationService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
  }

  onPageChange(page: string): void {
    this.navigationService.setCurrentPage(page);
  }
}