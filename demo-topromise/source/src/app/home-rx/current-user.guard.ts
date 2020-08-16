import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../../_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {
    const { data: { role, fakeUser } } = next;
    return this.userService.getUserCurrent(fakeUser).pipe(
      map(fake => !(fake == null || fake.role !== role)),
      tap(allowed => {
        if (!allowed) {
          this.router.navigate(['/error-permision', 'Bạn không có quyền dùng chức năng này']);
        }
      })
    );
  }
}
