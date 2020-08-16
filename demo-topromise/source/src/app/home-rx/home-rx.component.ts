import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { filter, finalize, mapTo, switchMap, takeUntil } from 'rxjs/operators';
import { DialogService } from '../../_service/dialog.service';
import { OrderService } from '../../_service/order.service';
import { UserService } from '../../_service/user.service';
import { WarehouseService } from '../../_service/warehouse.service';
import { CustomValidators } from './custom-validators';

interface ItemTransfer {
  id: number;
  name: string;
  quantity: number;
  unit: { id: number; text: string };
}

@Component({
  selector: 'app-home-rx',
  templateUrl: './home-rx.component.html',
  styleUrls: ['./home-rx.component.scss']
})
export class HomeRxComponent implements OnInit, OnDestroy {

  private $destroyed = new Subject();
  private $loading = new BehaviorSubject<boolean>(false);
  loading$ = this.$loading.asObservable();

  myForm: FormGroup;

  private confirmedUserNotOnline = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dl: DialogService,
    private readonly userService: UserService,
    private readonly warehouseService: WarehouseService,
    private readonly orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.$loading.next(true);
    this.createForm();
    this.$loading.next(false);
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  private createForm() {
    this.myForm = this.fb.group({
      code: ['order-123'],
      warehouseFrom: [
        { id: 1, text: 'Kho A' },
        null,
        CustomValidators.checkStorage(this.warehouseService.checkQuantity.bind(this.warehouseService),
          'noQuantity',
          () => this.dl.alert('Không đủ hàng trong kho để vận chuyển'))
      ],
      warehouseTo: [
        { id: 2, text: 'Kho B' },
        null,
        CustomValidators.checkStorage(this.warehouseService.checkStorageCapacity.bind(this.warehouseService),
          'noQuantity',
          () => this.dl.alert('Không nhận hàng không đủ sức chứa để vận chuyển'))
      ],
      assignee: [
        { id: 1, name: 'Nguyễn Văn A', code: '0001' },
        null,
        CustomValidators.checkUserOnline(this.userService.checkOnline.bind(this.userService))
      ],
      itemTransfer: this.fb.array([
        this.addItemTransfer({ id: 1, name: 'Sản phẩm 1', quantity: 100, unit: { id: 1, text: 'Chiếc' } }),
        this.addItemTransfer({ id: 1, name: 'Sản phẩm 1', quantity: 100, unit: { id: 1, text: 'Chiếc' } })
      ])
    });

    this.assigneeControl.statusChanges.pipe(
      filter(status => status === 'INVALID'),
      mapTo(this.assigneeControl.hasError('userNotOnline')),
      switchMap(isUserNotOnline => {
        if (isUserNotOnline) {
          return this.dl.confirmRx('',
            `${ this.assigneeControl.value.name } hôm nay không đi làm. Bạn vẫn muốn tạo phiếu cho người này chứ?`);
        }
        return EMPTY;
      }),
      takeUntil(this.$destroyed)
    ).subscribe({
      next: confirmed => {
        if (confirmed) {
          this.confirmedUserNotOnline = true;
          this.assigneeControl.updateValueAndValidity({ onlySelf: true });
          // Uncomment if errors isn't used anymore
          // this.assigneeControl.setErrors(null);
        } else {
          this.confirmedUserNotOnline = false;
        }
      }
    });
  }

  get assigneeControl(): FormControl {
    return this.myForm.get('assignee') as FormControl;
  }

  formSubmit() {
    // Uncomment when form is implemented
    // if (this.myForm.invalid) {
    //   return;
    // }
    this.$loading.next(true);
    this.orderService.addOrder(this.myForm.value).pipe(
      finalize(() => {
        this.$loading.next(false);
      })
    ).subscribe(result => {
      if (result.success) {
        this.dl.alert('Tạo đơn hàng thành công');
      }
    });

  }

  private addItemTransfer(itemTransfer: ItemTransfer) {
    return this.fb.group({
      id: [itemTransfer.id],
      name: [itemTransfer.name],
      quantity: [itemTransfer.quantity],
      unit: [itemTransfer.unit]
    });
  }
}
