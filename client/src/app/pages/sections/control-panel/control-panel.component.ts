import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <!-- Header Stats -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <mat-card class="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm">Total Events</p>
              <p class="text-3xl font-bold">1,234</p>
            </div>
            <mat-icon class="text-blue-200 text-4xl">event</mat-icon>
          </div>
        </mat-card>
        
        <mat-card class="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm">Active Cameras</p>
              <p class="text-3xl font-bold">12</p>
            </div>
            <mat-icon class="text-green-200 text-4xl">videocam</mat-icon>
          </div>
        </mat-card>
        
        <mat-card class="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm">Alerts Today</p>
              <p class="text-3xl font-bold">23</p>
            </div>
            <mat-icon class="text-orange-200 text-4xl">warning</mat-icon>
          </div>
        </mat-card>
        
        <mat-card class="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm">AI Detection Rate</p>
              <p class="text-3xl font-bold">98%</p>
            </div>
            <mat-icon class="text-purple-200 text-4xl">psychology</mat-icon>
          </div>
        </mat-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <mat-card class="p-6">
          <mat-card-header>
            <mat-card-title>Event Distribution</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="h-80">
              <apx-chart
                [series]="pieChartSeries"
                [chart]="pieChartOptions.chart"
                [labels]="pieChartOptions.labels"
                [colors]="pieChartOptions.colors"
                [legend]="pieChartOptions.legend"
              ></apx-chart>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="p-6">
          <mat-card-header>
            <mat-card-title>Monthly Events</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="h-80">
              <apx-chart
                [series]="barChartSeries"
                [chart]="barChartOptions.chart"
                [xaxis]="barChartOptions.xaxis"
                [colors]="barChartOptions.colors"
              ></apx-chart>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <mat-card class="p-6">
        <mat-card-header>
          <mat-card-title>Recent Activity</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div *ngFor="let activity of recentActivities" class="flex items-center justify-between py-3 border-b">
              <div class="flex items-center space-x-3">
                <mat-icon [class]="activity.iconClass">{{ activity.icon }}</mat-icon>
                <div>
                  <p class="font-medium">{{ activity.title }}</p>
                  <p class="text-sm text-gray-500">{{ activity.description }}</p>
                </div>
              </div>
              <span class="text-sm text-gray-400">{{ activity.time }}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class ControlPanelComponent implements OnInit {
  
  pieChartSeries = [45, 28, 18, 9];
  pieChartOptions = {
    chart: { type: 'pie', height: 300 },
    labels: ['Intrusion', 'Vol', 'Vandalisme', 'Bagarre'],
    colors: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
    legend: { position: 'bottom' }
  };

  barChartSeries = [{
    name: 'Events',
    data: [45, 52, 48, 61, 55, 67]
  }];

  barChartOptions = {
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'] },
    colors: ['#3b82f6']
  };

  recentActivities = [
    {
      icon: 'warning',
      iconClass: 'text-red-500',
      title: 'Security Alert',
      description: 'Unauthorized access detected at main entrance',
      time: '2 min ago'
    },
    {
      icon: 'videocam',
      iconClass: 'text-blue-500',
      title: 'Camera Status',
      description: 'Camera 3 back online after maintenance',
      time: '15 min ago'
    },
    {
      icon: 'person',
      iconClass: 'text-green-500',
      title: 'Person Detected',
      description: 'Staff member identified in restricted area',
      time: '23 min ago'
    },
    {
      icon: 'directions_car',
      iconClass: 'text-orange-500',
      title: 'Vehicle Entry',
      description: 'Delivery truck entered parking lot',
      time: '45 min ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }
}