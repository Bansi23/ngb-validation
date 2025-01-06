
# Ngb Validation Library

The `ngb-validation` library provides a collection of reusable Angular validators and directives for form controls. These utilities make form validation easy, flexible, and consistent across your projects. The library includes functionality such as phone number formatting, whitespace validation, and password match validation.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Importing Validators and Directives](#importing-validators-and-directives)
   - [Using Validators in Reactive Forms](#using-validators-in-reactive-forms)
   - [Using PhoneNumberFormatDirective](#using-phonenumberformatdirective)
   - [Using Validators in Template-Driven Forms](#using-validators-in-template-driven-forms)
3. [Validators and Directives](#validators-and-directives)
   - [No Whitespace Validator](#no-whitespace-validator)
   - [Match Password Validator](#match-password-validator)
   - [Phone Number Format Directive](#phone-number-format-directive)
4. [License](#license)

---

## Installation

### Using NPM
To install the library, use the following command in your Angular project:

```bash
npm install ngb-validation
```

### Using Yarn
Alternatively, you can install it using Yarn:

```bash
yarn add ngb-validation
```

---

## Usage

### Importing Validators and Directives
Import the required validators and directives into your Angular component or module.

```typescript
import { noWhitespaceValidator, matchPasswordValidator } from 'ngb-validation';
import { PhoneNumberFormatDirective } from 'ngb-validation';
```

You can import and use these utilities in any Angular component that requires form validation.

---

### Using Validators in Reactive Forms
To use the validators in a reactive form, follow these steps:

**Example: Using Validators**

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, matchPasswordValidator, PhoneNumberFormatDirective } from 'ngb-validation';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html', 
  imports: [PhoneNumberFormatDirective]
})
export class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, noWhitespaceValidator()]],
      password: ['', [Validators.required, noWhitespaceValidator()]],
      confirmPassword: ['', [Validators.required, noWhitespaceValidator()]],
    }, {
      validators: matchPasswordValidator('password', 'confirmPassword'),
    });
  }
}
```

In this example, the `name`, `password`, and `confirmPassword` fields are validated for whitespace, and the `password` and `confirmPassword` fields are validated for matching values.

---

### Using PhoneNumberFormatDirective

To format the phone number input as the user types, use the `PhoneNumberFormatDirective` in your form input. The directive will automatically format the phone number according to the format you specify.

**Example:**

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label for="phone">Phone Number</label>
    <input id="phone" formControlName="phone" appPhoneNumberFormat [format]="'00-000-0000'" />
    <div *ngIf="form.get('phone')?.hasError('invalidPhoneNumber')">
      Invalid phone number format.
    </div>
  </div>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

Here, the phone number is automatically formatted according to the specified format.

---

### Using Validators in Template-Driven Forms

For template-driven forms, you can apply the validators as well. Here's an example for using the `PhoneNumberFormatDirective`:

```html
<form #form="ngForm">
  <div>
    <label for="phone">Phone Number</label>
    <input id="phone" name="phone" ngModel appPhoneNumberFormat [format]="'000-000-0000'" />
  </div>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

---

## Validators and Directives Included

### 1. **No Whitespace Validator**
Ensures the value of a form control does not contain only whitespace.

**Usage:**
```typescript
noWhitespaceValidator(): ValidatorFn
```

**Error:**
- `{ whitespace: true }`

---

### 2. **Match Password Validator**
Ensures two form controls (e.g., `password` and `confirmPassword`) match.

**Usage:**
```typescript
matchPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn
```

**Error:**
- `{ passwordMismatch: true }`

---

### 3. **Phone Number Format Directive**
Formats the phone number input as the user types, applying a custom format like `(000) 000-0000`.

**Usage:**
```html
<input formControlName="phone" appPhoneNumberFormat [format]="'000-000-0000'" />
```

**Errors:**
- `{ invalidPhoneNumber: true }` if the phone number does not match the expected format.

---

## License
This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
