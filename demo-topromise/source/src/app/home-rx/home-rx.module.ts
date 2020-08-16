import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CurrentUserGuard } from './current-user.guard';
import { HomeRxComponent } from './home-rx.component';

const routes = [
  {
    path: '', component: HomeRxComponent, canActivate: [CurrentUserGuard], data: {
      role: 'Manager',
      fakeUser: { id: 1, username: 'admin', role: 'Manager' }
    }
  }
];

@NgModule({
  declarations: [HomeRxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRxModule {
}
