# Ngb Validation Library

The `ngb-validation` library provides a collection of reusable Angular validators for form controls, making form validation easy and consistent across your projects.

## Installation

### Using NPM
```bash
npm install ngb-validation
```

### Using Yarn
```bash
yarn add ngb-validation
```

---

## Usage

### Step 1: Import Validators
Import the required validators into your Angular component:

```typescript
import { noWhitespaceValidator, matchPasswordValidator } from 'ngb-validation';
```

### Step 2: Add Validators to Form Controls
Use the imported validators when building your Angular forms.

**Example:**

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, matchPasswordValidator } from 'ngb-validation';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
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

### Step 3: Display Validation Messages
In your template, display validation messages based on the form control's state.

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label>Name</label>
    <input formControlName="name" />
    <div *ngIf="form.get('name')?.hasError('whitespace')">
      Whitespace is not allowed
    </div>
  </div>

  <div>
    <label>Password</label>
    <input type="password" formControlName="password" />
  </div>

  <div>
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" />
    <div *ngIf="form.hasError('passwordMismatch')">
      Passwords do not match
    </div>
  </div>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

---

## Validators Included

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

## Issues
If you encounter any issues or bugs, please report them at:
[GitHub Issues](https://github.com/Bansi23/ngb-validation/issues)

---

## Contributing
We welcome contributions! Feel free to submit a pull request or open an issue to discuss any changes.

---

## License
This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
