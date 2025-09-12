import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-client-analysis',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Client Analysis</h1>
        <p class="text-gray-600">Advanced client behavior and interaction analysis</p>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Main Analysis Content -->
        <div class="col-span-8">
          <!-- Client Overview -->
          <mat-card class="mb-6">
            <mat-card-header>
              <mat-card-title class="flex items-center gap-2">
                <mat-icon class="text-blue-600">analytics</mat-icon>
                Client Behavior Analysis
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="grid grid-cols-4 gap-4 mb-6">
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600">1,234</div>
                  <div class="text-sm text-gray-600">Total Clients</div>
                </div>
                <div class="text-center p-4 bg-green-50 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">87%</div>
                  <div class="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div class="text-center p-4 bg-orange-50 rounded-lg">
                  <div class="text-2xl font-bold text-orange-600">12m</div>
                  <div class="text-sm text-gray-600">Avg Visit Time</div>
                </div>
                <div class="text-center p-4 bg-purple-50 rounded-lg">
                  <div class="text-2xl font-bold text-purple-600">23</div>
                  <div class="text-sm text-gray-600">Active Today</div>
                </div>
              </div>

              <!-- Client Table -->
              <table mat-table [dataSource]="clientData" class="w-full">
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Client</th>
                  <td mat-cell *matCellDef="let client">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <mat-icon>person</mat-icon>
                      </div>
                      <div>
                        <div class="font-medium">{{ client.name }}</div>
                        <div class="text-sm text-gray-500">{{ client.id }}</div>
                      </div>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let client">
                    <mat-chip [class]="getStatusClass(client.status)">
                      {{ client.status }}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="visits">
                  <th mat-header-cell *matHeaderCellDef>Visits</th>
                  <td mat-cell *matCellDef="let client">{{ client.visits }}</td>
                </ng-container>

                <ng-container matColumnDef="lastSeen">
                  <th mat-header-cell *matHeaderCellDef>Last Seen</th>
                  <td mat-cell *matCellDef="let client">{{ client.lastSeen }}</td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let client">
                    <button mat-icon-button>
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button>
                      <mat-icon>edit</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>

          <!-- Behavior Patterns -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Behavior Patterns</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-4">
                <div *ngFor="let pattern of behaviorPatterns" class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <mat-icon [style.color]="pattern.color">{{ pattern.icon }}</mat-icon>
                    <div>
                      <h4 class="font-medium">{{ pattern.title }}</h4>
                      <p class="text-sm text-gray-600">{{ pattern.description }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-semibold">{{ pattern.value }}</div>
                    <div class="text-sm text-gray-500">{{ pattern.metric }}</div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Right Sidebar -->
        <div class="col-span-4 space-y-4">
          <!-- Quick Stats -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Today's Insights</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">New Clients</span>
                  <span class="font-semibold text-green-600">+12</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Peak Hour</span>
                  <span class="font-semibold">14:00-15:00</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Avg Queue Time</span>
                  <span class="font-semibold">3.2 min</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Conversion Rate</span>
                  <span class="font-semibold text-blue-600">76%</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Recent Activity -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Recent Activity</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div *ngFor="let activity of recentActivity" class="flex items-center gap-3">
                  <mat-icon [style.color]="activity.color" class="text-sm">{{ activity.icon }}</mat-icon>
                  <div class="flex-1">
                    <p class="text-sm font-medium">{{ activity.title }}</p>
                    <p class="text-xs text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Actions -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Quick Actions</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-2">
                <button mat-stroked-button class="w-full">
                  <mat-icon>analytics</mat-icon>
                  Generate Report
                </button>
                <button mat-stroked-button class="w-full">
                  <mat-icon>file_download</mat-icon>
                  Export Data
                </button>
                <button mat-stroked-button class="w-full">
                  <mat-icon>settings</mat-icon>
                  Configure Analysis
                </button>
              </div>
            </mat-card-content>
          </mat-card>
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
export class ClientAnalysisComponent {
  displayedColumns: string[] = ['name', 'status', 'visits', 'lastSeen', 'actions'];

  clientData = [
    { id: 'CL001', name: 'Marie Dubois', status: 'Active', visits: 23, lastSeen: 'Today 14:30' },
    { id: 'CL002', name: 'Jean Martin', status: 'Inactive', visits: 5, lastSeen: 'Yesterday 16:45' },
    { id: 'CL003', name: 'Sophie Laurent', status: 'Active', visits: 34, lastSeen: 'Today 12:15' },
    { id: 'CL004', name: 'Pierre Durand', status: 'New', visits: 1, lastSeen: 'Today 15:22' }
  ];

  behaviorPatterns = [
    {
      icon: 'trending_up',
      title: 'Peak Traffic Pattern',
      description: 'Highest activity between 2-4 PM weekdays',
      value: '67%',
      metric: 'increase',
      color: '#10b981'
    },
    {
      icon: 'schedule',
      title: 'Average Dwell Time',
      description: 'Time spent in premises per visit',
      value: '12.3m',
      metric: 'minutes',
      color: '#3b82f6'
    },
    {
      icon: 'groups',
      title: 'Group Behavior',
      description: 'Clients arriving in groups of 2-3',
      value: '43%',
      metric: 'of visits',
      color: '#f59e0b'
    }
  ];

  recentActivity = [
    { icon: 'person_add', title: 'New client registered', time: '2 min ago', color: '#10b981' },
    { icon: 'timeline', title: 'Behavior pattern detected', time: '15 min ago', color: '#3b82f6' },
    { icon: 'notification_important', title: 'Unusual activity alert', time: '1h ago', color: '#f59e0b' },
    { icon: 'assessment', title: 'Daily report generated', time: '2h ago', color: '#8b5cf6' }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}