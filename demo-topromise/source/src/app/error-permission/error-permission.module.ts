import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPermissionComponent } from './error-permission.component';
import { ErrorPermissionRoutes } from './error-permission.routing';

@NgModule({
  imports: [
    CommonModule,
    ErrorPermissionRoutes
  ],
  declarations: [ErrorPermissionComponent]
})
export class ErrorPermissionModule { }
