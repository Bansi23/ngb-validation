
# Custom Angular Validation and Formatting Library

This custom Angular library provides validators and a directive to help with form validation and input formatting. It includes the following features:

- **Custom Validators** for:
  - No Whitespace
  - Password Match
  - URL Format
  - Strong Password
  - File Type & Size Validation
- **Phone Number Formatting** directive to apply specific input formats.

## Installation

To install the library in your Angular project, you can either:

1. **Download** the source files and include them in your project.
2. **Use npm** to install it (if you plan to publish it to npm later):

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

### 1. Importing Validators and Directives

Import the required validators and directives into your Angular component or module.

```typescript
import { noWhitespaceValidator, matchPasswordValidator, urlValidator, strongPasswordValidator, fileValidator, PhoneNumberFormatDirective } from 'ngb-validation';
```

Then, you can apply these validators in your form group:

```typescript
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { noWhitespaceValidator, matchPasswordValidator, urlValidator, strongPasswordValidator, fileValidator } from 'ngb-validation';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  imports: [PhoneNumberFormatDirective]
})
export class FormExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [noWhitespaceValidator()]],
      password: ['', [strongPasswordValidator()]],
      confirmPassword: ['', [matchPasswordValidator('password', 'confirmPassword')]],
      website: ['', [urlValidator()]],
      profileImage: ['', [fileValidator(['image/jpeg', 'image/png'], 5000000)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    } else {
      console.log('Form Invalid!');
    }
  }
}
```

### 2. Phone Number Format Directive

To use the phone number format directive, first import it:

```typescript
import { PhoneNumberFormatDirective } from 'ngb-validation';
@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  imports: [PhoneNumberFormatDirective]
  export class FormExampleComponent {
    ....
})
```

Then, add the directive to your component:

```html
<input type="text" appPhoneNumberFormat format="000-000-0000" [(ngModel)]="phoneNumber" />
```

This will automatically format the phone number input as the user types. You can also customize the format by changing the `format` input.

### 3. Example HTML Template

Here's an example HTML template for using the validators and phone number format directive:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <label for="username">Username:</label>
  <input id="username" formControlName="username" type="text" />
  <div *ngIf="form.get('username')?.hasError('whitespace')">
    Username cannot contain only spaces.
  </div>

  <label for="password">Password:</label>
  <input id="password" formControlName="password" type="password" />
  <div *ngIf="form.get('password')?.hasError('weakPassword')">
    Password must contain at least 8 characters, including an uppercase letter, a number, and a special character.
  </div>

  <label for="confirmPassword">Confirm Password:</label>
  <input id="confirmPassword" formControlName="confirmPassword" type="password" />
  <div *ngIf="form.get('confirmPassword')?.hasError('passwordMismatch')">
    Passwords do not match.
  </div>

  <label for="website">Website URL:</label>
  <input id="website" formControlName="website" type="text" />
  <div *ngIf="form.get('website')?.hasError('invalidUrl')">
    Please enter a valid URL.
  </div>

  <label for="profileImage">Profile Image (JPEG/PNG):</label>
  <input id="profileImage" formControlName="profileImage" type="file" />
  <div *ngIf="form.get('profileImage')?.hasError('invalidFile')">
    Please upload a valid file type (JPEG/PNG) and ensure the file size is less than 5MB.
  </div>

  <label for="phoneNumber">Phone Number:</label>
  <input id="phoneNumber" appPhoneNumberFormat formControlName="phoneNumber" type="text" />
  <div *ngIf="form.get('phoneNumber')?.hasError('invalidPhoneNumber')">
    Please enter a valid phone number.
  </div>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

## Issues
If you encounter any issues or bugs, please report them at:
[GitHub Issues](https://github.com/Bansi23/ngb-validation/issues)

---

## Contributing
We welcome contributions! Feel free to submit a pull request or open an issue to discuss any changes.

---

## Conclusion

This library provides essential form validation and input formatting tools for Angular projects. You can easily integrate these custom validators and directives into your forms, providing a better user experience and more consistent validation across your application.