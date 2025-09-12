import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vss-agent',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">VSS Agent</h1>
        <p class="text-gray-600">Intelligent AI agent for video surveillance analysis</p>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Chat Interface -->
        <div class="col-span-8">
          <mat-card class="h-[600px] flex flex-col">
            <mat-card-header>
              <mat-card-title class="flex items-center gap-2">
                <mat-icon class="text-blue-600">psychology</mat-icon>
                VSS AI Assistant
                <span class="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded text-sm">● Online</span>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="flex-1 flex flex-col">
              <!-- Chat Messages -->
              <div class="flex-1 overflow-auto space-y-4 mb-4">
                <div *ngFor="let message of chatMessages" 
                     [class]="'flex ' + (message.sender === 'user' ? 'justify-end' : 'justify-start')">
                  <div [class]="'max-w-xs lg:max-w-md px-4 py-2 rounded-lg ' + 
                               (message.sender === 'user' 
                                 ? 'bg-blue-600 text-white' 
                                 : 'bg-gray-200 text-gray-800')">
                    <div class="flex items-center gap-2 mb-1">
                      <mat-icon class="text-sm">
                        {{ message.sender === 'user' ? 'person' : 'psychology' }}
                      </mat-icon>
                      <span class="text-xs opacity-75">{{ message.sender === 'user' ? 'You' : 'VSS Agent' }}</span>
                      <span class="text-xs opacity-75">{{ message.timestamp }}</span>
                    </div>
                    <p class="text-sm">{{ message.content }}</p>
                  </div>
                </div>
              </div>

              <!-- Chat Input -->
              <div class="flex items-center gap-2">
                <mat-form-field appearance="outline" class="flex-1">
                  <input matInput 
                         placeholder="Ask VSS Agent about security events, analytics, or system status..."
                         [(ngModel)]="currentMessage"
                         (keyup.enter)="sendMessage()">
                </mat-form-field>
                <button mat-raised-button 
                        color="primary" 
                        (click)="sendMessage()"
                        [disabled]="!currentMessage.trim()">
                  <mat-icon>send</mat-icon>
                  Send
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Agent Controls -->
        <div class="col-span-4 space-y-4">
          <!-- Agent Status -->
          <mat-card>
            <mat-card-header>
              <mat-card-title class="text-lg">Agent Status</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">Status</span>
                  <mat-chip class="bg-green-100 text-green-800">Online</mat-chip>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Processing Speed</span>
                  <span class="text-sm font-medium">Real-time</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Confidence Level</span>
                  <span class="text-sm font-medium">98%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">Active Cameras</span>
                  <span class="text-sm font-medium">6/6</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Quick Actions -->
          <mat-card>
            <mat-card-header>
              <mat-card-title class="text-lg">Quick Actions</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-2">
                <button mat-stroked-button class="w-full text-left">
                  <mat-icon>search</mat-icon>
                  Search Recent Events
                </button>
                <button mat-stroked-button class="w-full text-left">
                  <mat-icon>summarize</mat-icon>
                  Generate Summary
                </button>
                <button mat-stroked-button class="w-full text-left">
                  <mat-icon>analytics</mat-icon>
                  View Analytics
                </button>
                <button mat-stroked-button class="w-full text-left">
                  <mat-icon>notifications</mat-icon>
                  Check Alerts
                </button>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Suggested Queries -->
          <mat-card>
            <mat-card-header>
              <mat-card-title class="text-lg">Suggested Queries</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-2">
                <button *ngFor="let query of suggestedQueries" 
                        mat-stroked-button 
                        class="w-full text-left text-xs"
                        (click)="selectQuery(query)">
                  {{ query }}
                </button>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- System Info -->
          <mat-card>
            <mat-card-header>
              <mat-card-title class="text-lg">System Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">VSS Version</span>
                  <span class="font-medium">v2.1.4</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">AI Model</span>
                  <span class="font-medium">GPT-Vision-Pro</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Last Update</span>
                  <span class="font-medium">2 hours ago</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Uptime</span>
                  <span class="font-medium">99.9%</span>
                </div>
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
    .mat-mdc-form-field {
      width: 100%;
    }
  `]
})
export class VssAgentComponent {
  currentMessage: string = '';
  
  chatMessages = [
    {
      sender: 'agent',
      content: 'Bonjour! Je suis votre assistant VSS AI. Comment puis-je vous aider avec l\'analyse de surveillance aujourd\'hui?',
      timestamp: '14:30'
    },
    {
      sender: 'user',
      content: 'Montre-moi un résumé des événements d\'aujourd\'hui',
      timestamp: '14:31'
    },
    {
      sender: 'agent',
      content: 'Voici un résumé des événements détectés aujourd\'hui: 23 personnes identifiées, 5 véhicules enregistrés, 2 alertes de sécurité (toutes résolues). Souhaitez-vous plus de détails sur un aspect particulier?',
      timestamp: '14:31'
    }
  ];

  suggestedQueries = [
    'Résumé des dernières 24h',
    'Personnes non identifiées',
    'Véhicules suspects détectés',
    'Alertes de sécurité actives',
    'Performance des caméras',
    'Analyse de comportement anormal'
  ];

  sendMessage(): void {
    if (this.currentMessage.trim()) {
      // Add user message
      this.chatMessages.push({
        sender: 'user',
        content: this.currentMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });

      // Simulate agent response
      setTimeout(() => {
        this.chatMessages.push({
          sender: 'agent',
          content: 'Je traite votre demande... Voici l\'analyse basée sur les données de surveillance actuelles.',
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        });
      }, 1000);

      this.currentMessage = '';
    }
  }

  selectQuery(query: string): void {
    this.currentMessage = query;
  }
}