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
  // {
  //   path:'recovery',
  //   title:'Recovery',
  //   canActivate: [canOpenNotAuthPage],
  // }
  // ,
  // {
  //   path:'profile',
  //   title:'Profile',
  //   canActivate: [canActivate],
  // },
  {
    path:"policy",
    title:"Policy",
    loadComponent:() => import('./features/policy/policy.component')
  },
  // {
  //   path:'verify',
  //   title:'Verify',
  //   canActivate: [canVerify],
  // },
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

