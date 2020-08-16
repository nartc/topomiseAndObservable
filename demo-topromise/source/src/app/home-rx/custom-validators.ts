import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

type ValidateFnCallback<T> = (self: FormControl, target: FormControl) => T;

const watchControl = <T extends ValidatorFn = ValidatorFn>(
  targetControlName: string,
  validate: ValidateFnCallback<ReturnType<T>>,
) => {
  let target: FormControl = null;
  return (control: FormControl) => {
    const form = control.root as FormGroup;
    let temp: FormControl;
    // tslint:disable-next-line:no-conditional-assignment
    if (!form || !form.controls || !(temp = form.get(targetControlName) as FormControl)) {
      return of(null);
    }

    if (target !== temp) {
      target = temp;
      target.valueChanges.subscribe(_ => control.updateValueAndValidity({ onlySelf: true }));
    }
    return validate(control, target);
  };
};

export class CustomValidators {
  static checkUserOnline(checkObs: (code: string) => Observable<boolean>): AsyncValidatorFn {
    return control => {
      if (!control || !control.value) {
        return null;
      }

      const { code } = control.value;
      if (!code) {
        return null;
      }

      return checkObs(code).pipe(
        map(isOnline => {
          if (isOnline) {
            return null;
          }

          return { userNotOnline: true };
        })
      );
    };
  }

  static checkStorage(
    checkObs: <TItem>(items: TItem[], quantityOrCapacity: number) => Observable<boolean>,
    errorKey: string,
    alertCb?: () => void,
    itemsControlName = 'itemTransfer'
  ): AsyncValidatorFn {
    return watchControl<AsyncValidatorFn>(itemsControlName, (self, target) => {
      if (!self || !self.value) {
        return null;
      }

      return checkObs(target.value, self.value).pipe(
        map(isOk => {
          if (isOk) {
            return null;
          }

          if (alertCb) {
            alertCb();
          }
          return { [errorKey]: true };
        })
      );
    });
  }
}
