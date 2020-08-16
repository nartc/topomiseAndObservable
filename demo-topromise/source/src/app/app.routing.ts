import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(x => x.HomeModule) },
  { path: 'rx', loadChildren: () => import('./home-rx/home-rx.module').then(x => x.HomeRxModule) },
  {
    path: 'error-permision/:message',
    loadChildren: () => import('./error-permission/error-permission.module').then(x => x.ErrorPermissionModule)
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
