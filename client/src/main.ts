import 'zone.js';
import '@angular/compiler';

// Better error diagnostics in development
if (import.meta.env.DEV) {
  await import('zone.js/plugins/zone-error');
}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app/app.routes';
import { NavigationService } from './app/services/navigation.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    NavigationService
  ]
});