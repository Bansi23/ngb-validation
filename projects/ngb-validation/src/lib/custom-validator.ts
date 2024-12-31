import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
        if (control?.value && control?.value?.trim().length === 0) {
          return { 'whitespace': true };
        }
        return null;
  };
}

export function matchPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField)?.value;
      const confirmPassword = control.get(confirmPasswordField)?.value;
  
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
}

  export function urlValidator(): ValidatorFn {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control?.value && !urlPattern.test(control.value)) {
        return { invalidUrl: true };
      }
      return null;
    };
  }
  