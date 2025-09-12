import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vss-search',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Smart Search</h1>
              <p class="text-sm text-gray-500 mt-1">AI-Powered Video Search & Analysis</p>
            </div>
            <div class="flex items-center gap-3">
              <button mat-stroked-button>
                <mat-icon>summarize</mat-icon>
                Summarize
              </button>
              <button mat-stroked-button>
                <mat-icon>search</mat-icon>
                Search
              </button>
              <button mat-stroked-button>
                <mat-icon>notifications</mat-icon>
                Alerts
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Search Section -->
      <div class="bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-6 py-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Natural Language Video Search</h2>
            <p class="text-gray-600">Ask questions in plain English and get instant video results powered by AI</p>
          </div>

          <!-- Search Bar -->
          <div class="max-w-4xl mx-auto mb-6">
            <mat-form-field appearance="outline" class="w-full">
              <mat-icon matPrefix>search</mat-icon>
              <input matInput 
                     placeholder='Ask anything... e.g., "Show all times a person in red entered the store between 2pm and 4pm"'
                     [(ngModel)]="searchQuery">
              <button mat-raised-button 
                      color="primary" 
                      matSuffix
                      (click)="performSearch()">
                <mat-icon>search</mat-icon>
                Search
              </button>
            </mat-form-field>
          </div>

          <!-- Popular Searches -->
          <div class="flex items-center justify-center gap-2 flex-wrap mb-4">
            <span class="text-sm text-gray-500">Popular searches:</span>
            <mat-chip-listbox>
              <mat-chip-option *ngFor="let search of popularSearches" 
                              (click)="selectSearch(search.text)">
                <mat-icon>{{ search.icon }}</mat-icon>
                {{ search.text }}
              </mat-chip-option>
            </mat-chip-listbox>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-center gap-3">
            <button mat-stroked-button>
              <mat-icon>mic</mat-icon>
              Voice Search
            </button>
            <button mat-stroked-button>
              <mat-icon>tune</mat-icon>
              Advanced Filters
            </button>
            <button mat-stroked-button>
              <mat-icon>history</mat-icon>
              Search History
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="grid grid-cols-12 gap-6">
          <!-- Left Sidebar - Filters -->
          <div class="col-span-3">
            <mat-card>
              <mat-card-header>
                <mat-card-title class="text-base">Smart Filters</mat-card-title>
                <button mat-button color="primary" class="ml-auto">Reset All</button>
              </mat-card-header>
              <mat-card-content class="space-y-6">
                <!-- Time Range -->
                <div>
                  <h4 class="text-sm font-medium mb-3">Time Range</h4>
                  <div class="space-y-2">
                    <button mat-stroked-button class="w-full text-left">Last 24h</button>
                    <button mat-stroked-button class="w-full text-left">Last 7d</button>
                    <button mat-stroked-button class="w-full text-left">Last 30d</button>
                  </div>
                </div>

                <!-- Object Detection -->
                <div>
                  <h4 class="text-sm font-medium mb-3">Object Detection</h4>
                  <div class="space-y-2">
                    <mat-checkbox *ngFor="let obj of objectTypes">
                      <mat-icon class="mr-2">{{ obj.icon }}</mat-icon>
                      {{ obj.label }}
                    </mat-checkbox>
                  </div>
                </div>

                <!-- AI Confidence -->
                <div>
                  <h4 class="text-sm font-medium mb-3">AI Confidence</h4>
                  <mat-slider min="0" max="100" step="1" [(ngModel)]="confidenceLevel">
                    <input matSliderThumb [(ngModel)]="confidenceLevel">
                  </mat-slider>
                  <p class="text-xs text-gray-500 mt-1">{{ confidenceLevel }}%</p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <!-- Main Content Area -->
          <div class="col-span-9">
            <!-- Search Results -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2">Search Results</h3>
              <p class="text-sm text-gray-500">{{ searchResults.length }} results found</p>
            </div>

            <!-- Results Grid -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <mat-card *ngFor="let result of searchResults" class="overflow-hidden cursor-pointer hover:shadow-lg">
                <div class="relative">
                  <img [src]="result.thumbnail" [alt]="result.title" class="w-full h-48 object-cover">
                  <div class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {{ result.camera }}
                  </div>
                  <div class="absolute top-2 right-2 bg-white/90 text-gray-900 text-xs px-2 py-1 rounded">
                    {{ result.confidence }}
                  </div>
                  <div class="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {{ result.duration }}
                  </div>
                </div>
                <mat-card-content class="p-3">
                  <h4 class="font-medium text-sm mb-1">{{ result.title }}</h4>
                  <p class="text-xs text-gray-500 mb-2">{{ result.timestamp }}</p>
                  <p class="text-xs text-gray-600 mb-3">{{ result.description }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1">
                      <button mat-icon-button size="small">
                        <mat-icon>share</mat-icon>
                      </button>
                      <button mat-icon-button size="small">
                        <mat-icon>download</mat-icon>
                      </button>
                    </div>
                    <button mat-stroked-button size="small">
                      <mat-icon>play_arrow</mat-icon>
                      Play
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- Load More -->
            <div class="text-center">
              <button mat-stroked-button class="px-8">Load More Results</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `]
})
export class VssSearchComponent {
  searchQuery: string = '';
  confidenceLevel: number = 75;

  popularSearches = [
    { icon: 'person', text: 'Person in red shirt' },
    { icon: 'directions_car', text: 'Vehicle license ABC123' },
    { icon: 'schedule', text: 'After 2pm today' },
    { icon: 'warning', text: 'Suspicious behavior' }
  ];

  objectTypes = [
    { label: 'Person', icon: 'person' },
    { label: 'Vehicle', icon: 'directions_car' },
    { label: 'Package', icon: 'inventory_2' },
    { label: 'Alert', icon: 'warning' }
  ];

  searchResults = [
    {
      id: 1,
      camera: 'CAM-01',
      timestamp: 'Today 14:32:15',
      duration: '0:58',
      title: 'Person in Red - Main Entrance',
      description: 'Individual wearing red shirt entering through main entrance.',
      confidence: '95% Match',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 2,
      camera: 'CAM-04',
      timestamp: 'Today 14:45:22', 
      duration: '1:12',
      title: 'Tracked Person - Hallway',
      description: 'Same individual tracked moving through hallway corridor.',
      confidence: '80% Match',
      thumbnail: '/api/placeholder/320/180'
    },
    {
      id: 3,
      camera: 'CAM-02',
      timestamp: 'Today 14:47:11',
      duration: '0:54', 
      title: 'Person Exit - Rear Door',
      description: 'Same person exiting through rear door.',
      confidence: '95% Match',
      thumbnail: '/api/placeholder/320/180'
    }
  ];

  performSearch(): void {
    console.log('Performing search:', this.searchQuery);
  }

  selectSearch(searchText: string): void {
    this.searchQuery = searchText;
  }
}