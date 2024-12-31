import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumberFormat]',
  standalone: true,  // Mark it as standalone
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberFormatDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneNumberFormatDirective),
      multi: true,
    },
  ],
})
export class PhoneNumberFormatDirective implements ControlValueAccessor, Validator {
  @Input() format: string = '000-000-0000'; // Default format

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = this.el.nativeElement;
    let rawValue = input.value.replace(/\D/g, '');
    const maxLength = this.format.replace(/\D/g, '').length;
    if (rawValue.length > maxLength) {
      rawValue = rawValue.slice(0, maxLength);
    }
    const formattedValue = this.applyFormat(rawValue, this.format);
    input.value = formattedValue;

    // Notify Angular about the new value
    this.onChange(rawValue);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    const input = this.el.nativeElement;
    let rawValue = input.value.replace(/\D/g, '');

    const formattedValue = this.applyFormat(rawValue, this.format);
    input.value = formattedValue;
    this.onChange(rawValue);
    this.onTouched();
    const control = input.formControl;
    if (control) {
      control.updateValueAndValidity();
    }
  }

  private applyFormat(value: string, format: string): string {
    let formatted = '';
    let valueIndex = 0;

    for (let i = 0; i < format.length && valueIndex < value.length; i++) {
      if (format[i] === '0') {
        formatted += value[valueIndex++]; // Add digits
      } else {
        formatted += format[i];
      }
    }

    return formatted;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const digitsOnly = control.value.replace(/\D/g, '');
    const formatLength = this.format.replace(/\D/g, '').length;
    const isValid = digitsOnly.length === formatLength;

    return isValid ? null : { invalidPhoneNumber: { value: control.value } };
  }
  writeValue(value: string): void {
    const rawValue = value ? value.replace(/\D/g, '') : '';
    this.el.nativeElement.value = this.applyFormat(rawValue, this.format);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
