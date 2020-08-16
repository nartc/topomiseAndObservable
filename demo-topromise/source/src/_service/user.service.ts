import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserCurrent() {
    //Lay user hien tai
    return of({ id: 1, userName: 'admin', role: 'Manager' });
  }

  public checkOnline(code: string) {
    return code === '001' ? of(true) : of(false);
  }

}
