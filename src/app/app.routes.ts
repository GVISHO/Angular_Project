import { Routes } from '@angular/router';

export const routes: Routes = [ {
    path: '',
    title: 'Home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path:"login",
    title:"Log In",
    loadComponent:() => import('./features/login/login.component')
  },
  {
    path: '404',
    title: 'Not found',
    
    loadComponent: () => import('./features/notfound/notfound.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

