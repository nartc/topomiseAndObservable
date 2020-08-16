import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/_service/warehouse.service';
import { OrderService } from 'src/_service/order.service';
import { DialogService } from 'src/_service/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private user: any;
  public myForm: FormGroup;
  constructor(private userService: UserService,
    private fb: FormBuilder,
    private rt: Router,
    private warehouseService: WarehouseService,
    private orderService: OrderService,
    private dl: DialogService) { }

  async ngOnInit() {
    this.uiLoading(true);
    this.user = await this.userService.getUserCurrent().toPromise();
    if (this.user && this.user.role !== 'Manager') {
      this.rt.navigate(['/error-permision', 'Bạn không có quyền dùng chức năng này']);
      return;
    }

    this.createForm();
    this.uiLoading(false);
  }

  uiLoading(value: boolean) {
    //logic ui loading
  }

  createForm() {
    this.myForm = this.fb.group({
      code: ['order-123'],
      warehouseFrom: [{ id: 1, text: 'Kho A' }],
      warehouseTo: [{ id: 2, text: 'Kho B' }],
      assigne: [{ id: 1, name: 'Nguyễn Văn A', code: '0001' }],
      itemTransfer: this.fb.array([
        this.addItemTransfer({ id: 1, name: 'Sản phẩm 1', quantity: 100, unit: { id: 1, text: 'Chiếc' } }),
        this.addItemTransfer({ id: 2, name: 'Sản phẩm 2', quantity: 500, unit: { id: 2, text: 'Kiện' } })
      ])
    })
  }

  addItemTransfer(value: any) {
    const itemForm = this.fb.group({
      id: [null],
      name: [''],
      quantity: [0],
      unit: [{ id: 1, text: 'Chiếc' }]
    });
    itemForm.patchValue(value);
    return itemForm;
  }

  async validUser() {

  }

  async formSubmit() {
    if (this.myForm.invalid) {
      return;
    }
    this.uiLoading(true);
    //valid logic
    const formValue = this.myForm.value;
    //valid online
    const checkOnline = await this.userService.checkOnline(formValue.assigne.code).toPromise();
    if (!checkOnline) {
      const resultConfirm = await this.dl.confirm('', `${formValue.assigne.name} hôm nay không đi làm. Bạn vẫn muốn tạo phiếu cho người này chứ?`)
      if (!resultConfirm) {
        return;
      }
    }
    //valid quantity vs capacity
    const checkQuantity = this.warehouseService.checkQuantity(formValue.itemTransfer, formValue.warehouseFrom);
    const checkCapacity = this.warehouseService.checkStorageCapacity(formValue.itemTransfer, formValue.warehouseTo);
    const rsQuantityVsCapacity = await forkJoin(
      checkQuantity,
      checkCapacity
    ).toPromise();
    if (!rsQuantityVsCapacity[0]) {
      this.dl.alert('Không đủ hàng trong kho để vận chuyển');
      return;
    }
    if (!rsQuantityVsCapacity[1]) {
      this.dl.alert('Không nhận hàng không đủ sức chứa để vận chuyển');
      return;
    }

    const rs = await this.orderService.addOrder(formValue).toPromise();
    if (rs.success) {
      this.dl.alert('Tạo đơn hàng thành công');
      //close
    }else{
      //bind error
    }

    this.uiLoading(false);
  }

}
