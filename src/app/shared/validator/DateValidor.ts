import {AbstractControl} from "@angular/forms";

export function ValidatorDatePattern(control: AbstractControl) {
  let date = control.value;
  if (!!date) {
    date = new Date(date).toLocaleDateString();
    if (typeof date === 'string' && typeof date !== null) {
      if (/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2}|3000)$/.test(date))
      {
        return null;
      } else {
        return { 'pattern': { value: control.value } };
      }
    }
  }

  return null;
}

export function ValidatorDateBeforeToday(control: AbstractControl) {
  let date = control.value;
  if (!!date) {
    if (new Date(date).toLocaleDateString() < new Date().toLocaleDateString()) {
      return { 'inferieur_date_jour': { value: control.value } };
    }
  }

  return null;
}
