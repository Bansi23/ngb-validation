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

  export function phoneNumberValidator(): ValidatorFn {
    const phoneNumberPattern = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/;
  
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control?.value && !phoneNumberPattern.test(control.value)) {
        return { phoneNumber: true }; // Validation fails
      }
      return null; // Validation passes
    };
  }