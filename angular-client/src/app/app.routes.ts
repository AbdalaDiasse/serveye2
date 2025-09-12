import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/frame/frame.component').then(m => m.FrameComponent)
  },
  {
    path: 'client-analysis',
    loadComponent: () => import('./pages/client-analysis/client-analysis.component').then(m => m.ClientAnalysisComponent)
  },
  {
    path: 'vss-agent',
    loadComponent: () => import('./pages/vss-agent/vss-agent.component').then(m => m.VssAgentComponent)
  },
  {
    path: 'vss-resume',
    loadComponent: () => import('./pages/vss-resume/vss-resume.component').then(m => m.VssResumeComponent)
  },
  {
    path: 'vss-search',
    loadComponent: () => import('./pages/vss-search/vss-search.component').then(m => m.VssSearchComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];