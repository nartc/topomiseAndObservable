import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  public addOrder(value: any) {
    return of({ success: true, data: {} });
  }
}
