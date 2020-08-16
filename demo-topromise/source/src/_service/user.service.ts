import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUserCurrent(fakeUser: {id: number, username: string, role: string}) {
    // Lay user hien tai
    return of(fakeUser);
  }

  public checkOnline(code: string) {
    return code === '001' ? of(true) : of(false);
  }

}
