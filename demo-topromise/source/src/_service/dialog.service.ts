import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    // private modal: NzModalService
  ) {
  }

  public alert(message: string) {
    return window.alert(message);
    //return (new Promise<boolean>((resolve) => {
    // this.modal.alert({
    //   nzTitle: '',
    //   nzContent: message,
    //   nzOnOk: () => resolve(true)
    // });
    //}).catch(() => console.log('Oops errors!')));
  }

  public confirm(title: string, message: string) {
    return of(true).toPromise();
    //return (new Promise<boolean>((resolve) => {
    // this.modal.confirm({
    //   nzTitle: title,
    //   nzContent: message,
    //   nzOnOk: () => resolve(true),
    //   nzOnCancel: () => resolve(false),
    // });
    //}).catch(() => console.log('Oops errors!')));
  }

  public confirmRx(title: string, message: string) {
    return of(true);
    //return (new Promise<boolean>((resolve) => {
    // this.modal.confirm({
    //   nzTitle: title,
    //   nzContent: message,
    //   nzOnOk: () => resolve(true),
    //   nzOnCancel: () => resolve(false),
    // });
    //}).catch(() => console.log('Oops errors!')));
  }
}
