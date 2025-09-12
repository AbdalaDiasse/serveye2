import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-vss-resume',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">VSS Resume</h1>
        <p class="text-gray-600">AI-powered video analysis and summary generation</p>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Left Side - Video Analysis -->
        <div class="col-span-8">
          <!-- Video Player Card -->
          <mat-card class="mb-6">
            <mat-card-header>
              <mat-card-title class="flex items-center gap-2">
                <mat-icon class="text-blue-600">videocam</mat-icon>
                Video Analysis - Zone Principale
                <span class="ml-auto bg-red-100 text-red-800 px-2 py-1 rounded text-sm">● REC</span>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <!-- Video Player Area -->
              <div class="bg-gray-900 rounded-lg p-6 mb-4 min-h-[400px] flex items-center justify-center">
                <div class="text-center text-white">
                  <mat-icon class="text-6xl mb-4">play_circle_outline</mat-icon>
                  <p class="text-lg">Video Player Placeholder</p>
                  <p class="text-sm text-gray-300">14:00 - 16:00 Analysis Period</p>
                </div>
              </div>

              <!-- Video Controls -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <button mat-icon-button color="primary">
                    <mat-icon>play_arrow</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>pause</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>stop</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>volume_up</mat-icon>
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <button mat-icon-button>
                    <mat-icon>download</mat-icon>
                  </button>
                  <button mat-icon-button>
                    <mat-icon>share</mat-icon>
                  </button>
                </div>
              </div>

              <mat-progress-bar mode="determinate" value="65" class="mb-4"></mat-progress-bar>

              <!-- Camera Thumbnails -->
              <div class="grid grid-cols-4 gap-2">
                <div *ngFor="let cam of cameras" class="relative aspect-video bg-gray-800 rounded cursor-pointer hover:bg-gray-700 overflow-hidden">
                  <img [src]="cam.thumbnail" [alt]="cam.name" class="w-full h-full object-cover">
                  <div class="absolute bottom-1 left-1">
                    <mat-chip class="bg-black/60 text-white text-xs">{{ cam.name }}</mat-chip>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- AI Generated Summary -->
          <mat-card>
            <mat-card-header>
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <mat-icon class="text-blue-600">psychology</mat-icon>
                  </div>
                  <div>
                    <mat-card-title>AI Generated Summary</mat-card-title>
                    <mat-chip class="bg-green-100 text-green-700 text-xs">Generated • 2 min ago</mat-chip>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button mat-stroked-button size="small">Brief</button>
                  <button mat-button size="small">Detailed</button>
                  <button mat-raised-button color="warn" size="small">
                    <mat-icon>description</mat-icon>
                    Export PDF
                  </button>
                </div>
              </div>
            </mat-card-header>
            <mat-card-content class="space-y-6">
              <!-- Period Analysis -->
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-blue-600">schedule</mat-icon>
                  <h3 class="font-semibold text-blue-900">Période d'analyse: 14:00 - 16:00 (Aujourd'hui)</h3>
                </div>
                
                <div class="grid grid-cols-4 gap-6 mb-4">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">127</div>
                    <div class="text-sm text-gray-600">Personnes détectées</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-green-600">23</div>
                    <div class="text-sm text-gray-600">Véhicules identifiés</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600">5</div>
                    <div class="text-sm text-gray-600">Alertes générées</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600">98%</div>
                    <div class="text-sm text-gray-600">Précision IA</div>
                  </div>
                </div>

                <div class="bg-blue-100 p-3 rounded border-l-4 border-blue-600">
                  <p class="text-sm text-blue-900">
                    <strong>Résumé Exécutif:</strong> Durant la période analysée de 14:00 à 16:00, le système VSS a traité et analysé 2 heures de flux vidéo en continu provenant de 6 caméras de sécurité.
                  </p>
                </div>
              </div>

              <!-- Person Analysis -->
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <mat-icon class="text-blue-600">people</mat-icon>
                    <h3 class="font-semibold text-gray-900">Analyse des Personnes</h3>
                  </div>
                  <div class="space-y-2 text-sm text-gray-700">
                    <p>• <strong>127 personnes uniques</strong> détectées et suivies</p>
                    <p>• <strong>89% d'employés reconnus</strong> via reconnaissance faciale</p>
                    <p>• <strong>15 visiteurs non-identifiés</strong> escortés selon les procédures</p>
                  </div>
                </div>

                <div>
                  <div class="flex items-center gap-2 mb-3">
                    <mat-icon class="text-green-600">directions_car</mat-icon>
                    <h3 class="font-semibold text-gray-900">Suivi Véhiculaire</h3>
                  </div>
                  <div class="space-y-2 text-sm text-gray-700">
                    <p>• <strong>23 véhicules</strong> identifiés dans le périmètre</p>
                    <p>• <strong>18 véhicules autorisés</strong> avec plaques reconnues</p>
                    <p>• <strong>5 véhicules visiteurs</strong> dirigés vers l'accueil</p>
                  </div>
                </div>
              </div>

              <!-- Security Incidents -->
              <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-orange-600">warning</mat-icon>
                  <h3 class="font-semibold text-orange-900">Incidents de Sécurité</h3>
                </div>
                <div class="space-y-3">
                  <div *ngFor="let incident of securityIncidents" 
                       [class]="'p-3 rounded border-l-4 ' + incident.bgClass + ' ' + incident.borderClass">
                    <div class="flex items-center gap-2 mb-1">
                      <mat-chip [class]="incident.chipClass" class="text-xs">{{ incident.severity }}</mat-chip>
                      <span [class]="'font-semibold ' + incident.textClass">{{ incident.time }} - {{ incident.title }}</span>
                    </div>
                    <p [class]="'text-sm ' + incident.descClass">{{ incident.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-between pt-4 border-t">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <mat-icon class="text-blue-600">psychology</mat-icon>
                  <span>Généré par VSS AI Engine v2.1 • Temps de traitement: 28 secondes</span>
                </div>
                <div class="flex items-center gap-2">
                  <button mat-stroked-button size="small">
                    <mat-icon>content_copy</mat-icon>
                    Copier
                  </button>
                  <button mat-raised-button color="primary" size="small">
                    <mat-icon>share</mat-icon>
                    Partager
                  </button>
                  <button mat-raised-button color="accent" size="small">
                    <mat-icon>refresh</mat-icon>
                    Régénérer
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Right Side Panels -->
        <div class="col-span-4 space-y-4">
          <!-- Prompt Generation -->
          <mat-card class="bg-blue-50 border-blue-200">
            <mat-card-header>
              <mat-card-title class="text-sm flex items-center gap-2 text-blue-800">
                <mat-icon>auto_awesome</mat-icon>
                Prompt de Résumé
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="text-xs space-y-2">
              <p class="text-gray-700">
                Décrivez précisément comment l'IA doit analyser et résumer la vidéo.
              </p>
            </mat-card-content>
          </mat-card>

          <!-- Objects to Track -->
          <mat-card class="bg-green-50 border-green-200">
            <mat-card-header>
              <mat-card-title class="text-sm flex items-center gap-2 text-green-800">
                <mat-icon>track_changes</mat-icon>
                Objets à Suivre
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="space-y-2">
              <div *ngFor="let obj of trackedObjects" class="flex items-center gap-2">
                <mat-icon [style.color]="obj.color">{{ obj.icon }}</mat-icon>
                <span class="text-sm">{{ obj.name }}</span>
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
export class VssResumeComponent {
  cameras = [
    { name: 'CAM-01', thumbnail: '/api/placeholder/120/68' },
    { name: 'CAM-02', thumbnail: '/api/placeholder/120/68' },
    { name: 'CAM-03', thumbnail: '/api/placeholder/120/68' },
    { name: 'CAM-04', thumbnail: '/api/placeholder/120/68' }
  ];

  securityIncidents = [
    {
      severity: 'CRITIQUE',
      time: '14:32',
      title: 'Tentative d\'accès non autorisé',
      description: 'détectée à l\'entrée arrière. Résolu en 2m15s.',
      chipClass: 'bg-red-600 text-white',
      textClass: 'text-red-900',
      descClass: 'text-red-800',
      bgClass: 'bg-red-100',
      borderClass: 'border-red-500'
    },
    {
      severity: 'MOYEN',
      time: '15:08',
      title: 'Porte de secours',
      description: 'ouverte pendant 45s pour maintenance programmée.',
      chipClass: 'bg-yellow-600 text-white',
      textClass: 'text-yellow-900',
      descClass: 'text-yellow-800',
      bgClass: 'bg-yellow-100',
      borderClass: 'border-yellow-500'
    }
  ];

  trackedObjects = [
    { name: 'Personnes', icon: 'person', color: '#3b82f6' },
    { name: 'Véhicules', icon: 'directions_car', color: '#10b981' },
    { name: 'Objets suspects', icon: 'warning', color: '#f59e0b' },
    { name: 'Mouvements', icon: 'trending_up', color: '#8b5cf6' }
  ];
}