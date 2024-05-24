import { Routes } from '@angular/router';

export const routes: Routes = [ {
    path: '',
    title: 'Home',
    loadComponent: () => import('./features/home/home.component'),
  }
];

