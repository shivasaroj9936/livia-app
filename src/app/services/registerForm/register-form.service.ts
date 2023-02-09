import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class RegisterFormService {
  public registerForm!: FormGroup;
  constructor(public formBuilder: FormBuilder) {}
  createForm() {
    this.registerForm = this.formBuilder.group({
      profile: this.formBuilder.group({
        avatar: ['', Validators.required],
        lab_name: ['', [Validators.required,Validators.minLength(3),this.noWhitespaceValidator]],
        physical_address: ['', Validators.required],
        address: ['', [Validators.required,this.noWhitespaceValidator]],
      }),
      document: this.formBuilder.group({
        tax_compliance: ['', Validators.required,],
        cr_12: ['', Validators.required],
        kra_pin_certificate: ['', Validators.required],
        regulator_licenses_1: ['', Validators.required],
        regulator_licenses_2: ['',],
        regulator_licenses_3: ['',],
      }),
      lab_photo: ['',Validators.required],
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
