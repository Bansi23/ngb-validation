import { Directive, Input, HostListener, Renderer2, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";

@Directive({
  selector: '[appPhoneNumberFormat]',
  standalone: true,  // Standalone directive declaration
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneNumberFormatDirective,
      multi: true,
    },
  ],
})
export class PhoneNumberFormatDirective implements ControlValueAccessor {
  @Input() phoneFormat: string = '000-000-0000'; // Default format
  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = this.applyFormat(value);
    this.renderer.setProperty(input, 'value', formattedValue);
    this.onChange(formattedValue); // Notify Angular forms of the value change
  }

  writeValue(value: any): void {
    const formattedValue = value ? this.applyFormat(value.replace(/\D/g, '')) : '';
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private applyFormat(value: string): string {
    let formatted = '';
    let index = 0;

    for (const char of this.phoneFormat) {
      if (char === '0' && index < value.length) {
        formatted += value[index++];
      } else if (index < value.length) {
        formatted += char;
      }
    }

    return formatted;
  }

  static ɵfac: i0.ɵɵFactoryDeclaration<PhoneNumberFormatDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<PhoneNumberFormatDirective, "[appPhoneNumberFormat]", never, { "phoneFormat": { "alias": "phoneFormat"; "required": false; }; }, {}, never, never, true, never>;
}
