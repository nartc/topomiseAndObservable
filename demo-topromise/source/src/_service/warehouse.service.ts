import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor() { }

  public checkQuantity(items: [], wareHouseCode: string) {
    //logic in server
    //kiểm tra xem hàng trong kho check còn đủ hay không?
    return of(true);
  }

  public checkStorageCapacity(items: [], wareHouseCode: string) {
    //logic in server
    //kiểm tra xem sức chưa trong kho check còn đủ hay không?
    return of(true);
  }
}
