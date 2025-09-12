import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface NavigationItem {
  name: string;
  icon: string;
  isActive: boolean;
  hasDropdown?: boolean;
  subItems?: NavigationSubItem[];
}

interface NavigationSubItem {
  name: string;
  icon: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <aside class="w-72 h-full bg-white/80 border-r border-white/20 shadow-xl flex flex-col overflow-hidden flex-shrink-0">
      <!-- Header -->
      <header class="h-20 border-b border-gray-200 flex items-center px-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <mat-icon class="text-white">security</mat-icon>
          </div>
          <div>
            <div class="font-bold text-slate-900 text-lg tracking-tight">SYRATE</div>
            <div class="font-normal text-slate-500 text-xs">Security Platform</div>
          </div>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="flex-1 p-4 overflow-auto">
        <div class="space-y-2">
          <div *ngFor="let item of navigationItems" class="relative">
            <!-- Main Navigation Item -->
            <div 
              [class]="getItemClasses(item)"
              (click)="handleItemClick(item)"
            >
              <mat-icon class="w-4 h-4 mr-3" 
                       [class]="getIconClasses(item)">
                {{ getIconName(item.icon) }}
              </mat-icon>
              <span [class]="getTextClasses(item)">{{ item.name }}</span>
              <mat-icon *ngIf="item.hasDropdown" 
                       class="ml-auto transition-transform duration-200"
                       [class.rotate-180]="openDropdown === item.name">
                expand_more
              </mat-icon>
            </div>
            
            <!-- Dropdown Sub Items -->
            <div *ngIf="item.subItems && openDropdown === item.name" 
                 class="ml-6 mt-1 space-y-1">
              <div *ngFor="let subItem of item.subItems"
                   [class]="getSubItemClasses(subItem, item)"
                   (click)="handleSubItemClick(subItem, item)">
                <mat-icon class="w-3 h-3 mr-3">{{ getIconName(subItem.icon) }}</mat-icon>
                <span [class]="getSubTextClasses(subItem, item)">{{ subItem.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class EventSummaryComponent implements OnInit {
  @Input() currentPage: string = 'dashboard';
  @Output() pageChange = new EventEmitter<string>();

  openDropdown: string | null = null;

  navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      icon: "dashboard",
      isActive: false,
    },
    {
      name: "Personnes",
      icon: "people",
      isActive: false,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", icon: "dashboard", isActive: false },
        { name: "Capture", icon: "camera_alt", isActive: false },
        { name: "Reconnaissance", icon: "face", isActive: false },
        { name: "Analyse Client", icon: "analytics", isActive: false },
      ],
    },
    {
      name: "Véhicules",
      icon: "directions_car",
      isActive: false,
      hasDropdown: true,
      subItems: [
        { name: "Dashboard", icon: "dashboard" },
        { name: "Captures", icon: "camera_alt" },
      ],
    },
    {
      name: "Événements",
      icon: "event",
      isActive: false,
    },
    {
      name: "VSS",
      icon: "smart_toy",
      isActive: false,
      hasDropdown: true,
      subItems: [
        { name: "Agent VSS", icon: "psychology", isActive: false },
        { name: "Résumé", icon: "summarize", isActive: false },
        { name: "Recherche", icon: "search", isActive: false },
        { name: "Alertes", icon: "notifications", isActive: false },
        { name: "Q/R", icon: "quiz", isActive: false },
      ],
    },
  ];

  ngOnInit(): void {
    this.updateActiveStates();
    this.setInitialDropdownState();
  }

  handleItemClick(item: NavigationItem): void {
    if (item.hasDropdown) {
      this.toggleDropdown(item.name);
    } else {
      const pageName = item.name.toLowerCase();
      this.pageChange.emit(pageName);
    }
  }

  handleSubItemClick(subItem: NavigationSubItem, parentItem: NavigationItem): void {
    const pageName = this.getPageNameForSubItem(subItem, parentItem);
    this.pageChange.emit(pageName);
  }

  toggleDropdown(itemName: string): void {
    this.openDropdown = this.openDropdown === itemName ? null : itemName;
  }

  getItemClasses(item: NavigationItem): string {
    const isActive = this.isItemActive(item);
    return `h-12 rounded-xl flex items-center px-4 cursor-pointer transition-all ${
      isActive ? this.getActiveGradient(item) : 'hover:bg-gray-50'
    }`;
  }

  getSubItemClasses(subItem: NavigationSubItem, parentItem: NavigationItem): string {
    const isActive = this.isSubItemActive(subItem, parentItem);
    return `flex items-center px-4 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive ? `h-12 bg-gradient-to-r ${this.getSubActiveGradient(parentItem)} shadow-md` : 'h-10 hover:bg-gray-50'
    }`;
  }

  getIconClasses(item: NavigationItem): string {
    const isActive = this.isItemActive(item);
    return isActive ? 'text-white' : 'text-slate-600';
  }

  getTextClasses(item: NavigationItem): string {
    const isActive = this.isItemActive(item);
    return `text-base tracking-tight truncate ${
      isActive ? 'font-semibold text-white' : 'font-normal text-slate-600'
    }`;
  }

  getSubTextClasses(subItem: NavigationSubItem, parentItem: NavigationItem): string {
    const isActive = this.isSubItemActive(subItem, parentItem);
    return `text-sm tracking-tight truncate ${
      isActive ? 'font-semibold text-white' : 'font-normal text-slate-500'
    }`;
  }

  private updateActiveStates(): void {
    // Update active states based on current page
  }

  private setInitialDropdownState(): void {
    if (this.currentPage.startsWith('vss')) {
      this.openDropdown = 'VSS';
    } else if (['capture', 'reconnaissance', 'persons', 'clientAnalysis'].includes(this.currentPage)) {
      this.openDropdown = 'Personnes';
    } else if (['vehicles', 'vehicleCapture'].includes(this.currentPage)) {
      this.openDropdown = 'Véhicules';
    }
  }

  private isItemActive(item: NavigationItem): boolean {
    if (item.name === 'VSS' && this.currentPage.startsWith('vss')) return true;
    if (item.name === 'Personnes' && ['capture', 'reconnaissance', 'persons', 'clientAnalysis'].includes(this.currentPage)) return true;
    if (item.name === 'Véhicules' && ['vehicles', 'vehicleCapture'].includes(this.currentPage)) return true;
    if (item.name === 'Événements' && this.currentPage === 'events') return true;
    return this.currentPage === item.name.toLowerCase();
  }

  private isSubItemActive(subItem: NavigationSubItem, parentItem: NavigationItem): boolean {
    const pageName = this.getPageNameForSubItem(subItem, parentItem);
    return this.currentPage === pageName;
  }

  private getPageNameForSubItem(subItem: NavigationSubItem, parentItem: NavigationItem): string {
    if (parentItem.name === 'VSS') {
      switch (subItem.name) {
        case 'Agent VSS': return 'vssAgent';
        case 'Résumé': return 'vssSummarize';
        case 'Recherche': return 'vssSearch';
        case 'Alertes': return 'vssAlerts';
        case 'Q/R': return 'vssQA';
        default: return subItem.name.toLowerCase();
      }
    } else if (parentItem.name === 'Personnes') {
      switch (subItem.name) {
        case 'Dashboard': return 'personnesDashboard';
        case 'Analyse Client': return 'clientAnalysis';
        default: return subItem.name.toLowerCase();
      }
    } else if (parentItem.name === 'Véhicules') {
      switch (subItem.name) {
        case 'Dashboard': return 'vehicles';
        case 'Captures': return 'vehicleCapture';
        default: return subItem.name.toLowerCase();
      }
    }
    return subItem.name.toLowerCase();
  }

  private getActiveGradient(item: NavigationItem): string {
    switch (item.name) {
      case 'Personnes': return 'shadow-md bg-gradient-to-r from-teal-500 to-cyan-500';
      case 'Événements': return 'shadow-md bg-gradient-to-r from-red-500 to-red-600';
      case 'Véhicules': return 'shadow-md bg-gradient-to-r from-orange-500 to-orange-600';
      case 'VSS': return 'shadow-md bg-gradient-to-r from-purple-500 to-indigo-600';
      default: return 'shadow-md bg-gradient-to-r from-blue-600 to-blue-500';
    }
  }

  private getSubActiveGradient(parentItem: NavigationItem): string {
    switch (parentItem.name) {
      case 'Véhicules': return 'from-orange-400 to-orange-500';
      case 'VSS': return 'from-purple-400 to-indigo-500';
      default: return 'from-teal-400 to-cyan-400';
    }
  }

  private getIconName(iconPath: string): string {
    // Convert icon paths to Material Icon names
    const iconMap: { [key: string]: string } = {
      '/figmaAssets/frame-1.svg': 'dashboard',
      '/figmaAssets/frame-2.svg': 'camera_alt',
      '/figmaAssets/frame-4.svg': 'event',
      '/figmaAssets/frame-6.svg': 'directions_car',
    };
    return iconMap[iconPath] || 'circle';
  }
}