import { Routes } from '@angular/router';
import { canActivate,
  canAuth,
  canOpenNotAuthPage,
  canVerify, } from './shared/services';
export const routes: Routes = [ {
    path: '',
    title: 'Home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {path:'about',
    title:"About",
    loadComponent: () => import('./features/about/about.component')
  },
  {
    path:'contact',
    title:"Contact",
    loadComponent: () => import('./features/contact/contact.component')
  },
  {
    path:'helpcentre',
    title:"Help Centre",
    loadComponent: () => import("./features/helpcentre/helpcentre.component")
  },
  {
    path:"login",
    title:"Log In",
    canActivate: [canAuth],
    loadComponent:() => import('./features/login/login.component')
  },
  {
    path:'signup',
    title:'Sign Up',
    canActivate: [canAuth],
    loadComponent:() => import('./features/signup/signup.component')
  },
  {
    path:'recovery',
    title:'Recovery',
    canActivate: [canOpenNotAuthPage],
    loadComponent:() => import('./features/recovery/recovery.component')
  }
  ,
  {
    path:'profile',
    title:'Profile',
    canActivate: [canActivate],
    loadComponent: () => import('./features/profile/profile.component')
  },
  {
    path:"policy",
    title:"Policy",
    loadComponent:() => import('./features/policy/policy.component')
  },
  {
    path:'verify',
    title:'Verify',
    canActivate: [canVerify],
    loadComponent:() => import('./features/verify/verify.component')
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

