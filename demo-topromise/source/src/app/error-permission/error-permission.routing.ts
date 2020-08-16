import { Routes, RouterModule } from '@angular/router';
import { ErrorPermissionComponent } from './error-permission.component';

const routes: Routes = [
  { path:'', component: ErrorPermissionComponent },
];

export const ErrorPermissionRoutes = RouterModule.forChild(routes);
