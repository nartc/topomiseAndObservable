import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPermissionComponent } from './error-permission/error-permission.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(x => x.HomeModule) },
  { path: 'error-permision/:message', loadChildren: () => import('./error-permission/error-permission.module').then(x => x.ErrorPermissionModule) }
];

export const AppRoutes = RouterModule.forRoot(routes);
