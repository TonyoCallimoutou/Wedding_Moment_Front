import {FormGroup} from "@angular/forms";

export function ValidatorPassword(formGroup: FormGroup) {
  let password = formGroup.get('password');
  let confirmPassword = formGroup.get('verifyPassword');

  if (!!password?.value && password.value.length < 6) {
    password.setErrors({minLength: true});
  }

  if (!!password?.value && !!confirmPassword?.value) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({notSame: true});
    } else {
      confirmPassword.setErrors(null);
    }
  }
  return null;
}
