import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor() { }

  onSubmit(): void{
    console.log(this.registerForm);
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthdate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      pswrepeat: new FormControl(null, [Validators.required, this.samePasswordValidators.bind(this)])

    });
  }
  samePasswordValidators(control: FormControl): { [s: string]: boolean } | null {
    return this.registerForm !== undefined && this.registerForm.get('password')!.value === control.value
      ? null
      : { notSamePassword: true }
  }
}
