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
    <div class="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen animate-fade-in">
      <!-- Header Stats -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <mat-card class="card-hover p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl animate-fade-up border-0 overflow-hidden relative" style="--animation-delay: 0.1s">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium tracking-wider uppercase">Total Events</p>
              <p class="text-4xl font-bold mb-1 animate-pulse">1,234</p>
              <p class="text-blue-200 text-xs">+12% from yesterday</p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <mat-icon class="text-white text-3xl">event</mat-icon>
            </div>
          </div>
        </mat-card>
        
        <mat-card class="card-hover p-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl animate-fade-up border-0 overflow-hidden relative" style="--animation-delay: 0.2s">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-emerald-100 text-sm font-medium tracking-wider uppercase">Active Cameras</p>
              <p class="text-4xl font-bold mb-1">12</p>
              <p class="text-emerald-200 text-xs">All systems online</p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <mat-icon class="text-white text-3xl">videocam</mat-icon>
            </div>
          </div>
        </mat-card>
        
        <mat-card class="card-hover p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl animate-fade-up border-0 overflow-hidden relative" style="--animation-delay: 0.3s">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium tracking-wider uppercase">Alerts Today</p>
              <p class="text-4xl font-bold mb-1">23</p>
              <p class="text-orange-200 text-xs">2 high priority</p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse">
              <mat-icon class="text-white text-3xl">warning</mat-icon>
            </div>
          </div>
        </mat-card>
        
        <mat-card class="card-hover p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl animate-fade-up border-0 overflow-hidden relative" style="--animation-delay: 0.4s">
          <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium tracking-wider uppercase">AI Detection Rate</p>
              <p class="text-4xl font-bold mb-1">98%</p>
              <p class="text-purple-200 text-xs">Excellent performance</p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <mat-icon class="text-white text-3xl">psychology</mat-icon>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <mat-card class="card-hover p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0 animate-fade-up" style="--animation-delay: 0.5s">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Event Analytics</h3>
            <mat-icon class="text-blue-600">analytics</mat-icon>
          </div>
          <div class="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
            <div class="text-center">
              <mat-icon class="text-6xl text-blue-400 mb-4">show_chart</mat-icon>
              <p class="text-slate-600 font-medium">Real-time Analytics Chart</p>
              <p class="text-slate-500 text-sm">ng-apexcharts integration</p>
            </div>
          </div>
        </mat-card>
        
        <mat-card class="card-hover p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0 animate-fade-up" style="--animation-delay: 0.6s">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Detection Heatmap</h3>
            <mat-icon class="text-green-600">map</mat-icon>
          </div>
          <div class="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
            <div class="text-center">
              <mat-icon class="text-6xl text-green-400 mb-4">location_on</mat-icon>
              <p class="text-slate-600 font-medium">Detection Heatmap</p>
              <p class="text-slate-500 text-sm">Zone activity visualization</p>
            </div>
          </div>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 gap-6">
        <mat-card class="card-hover p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0 animate-fade-up" style="--animation-delay: 0.7s">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Recent Activity</h3>
            <mat-button color="primary">View All</mat-button>
          </div>
          <div class="space-y-4">
            <div class="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl animate-fade-in">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <mat-icon class="text-white">person</mat-icon>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800">Person Detected</p>
                <p class="text-slate-600 text-sm">Camera 01 - Zone A</p>
              </div>
              <div class="text-slate-500 text-sm">2 min ago</div>
            </div>
            
            <div class="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl animate-fade-in" style="--animation-delay: 0.1s">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <mat-icon class="text-white">directions_car</mat-icon>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800">Vehicle Movement</p>
                <p class="text-slate-600 text-sm">Camera 03 - Parking</p>
              </div>
              <div class="text-slate-500 text-sm">5 min ago</div>
            </div>
            
            <div class="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl animate-fade-in" style="--animation-delay: 0.2s">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <mat-icon class="text-white">check_circle</mat-icon>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800">System Check Complete</p>
                <p class="text-slate-600 text-sm">All cameras operational</p>
              </div>
              <div class="text-slate-500 text-sm">10 min ago</div>
            </div>
          </div>
        </mat-card>
      </div>
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