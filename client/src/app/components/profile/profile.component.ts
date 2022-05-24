import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    userName: new FormControl({value: '', disabled: true}),
    email: new FormControl({value: '', disabled: true},[Validators.email]),
    opass: new FormControl({value: '', disabled: true},[Validators.required, Validators.minLength(5)]),
    npass: new FormControl({value: '', disabled: true},[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    cpass: new FormControl({value: ''}, [Validators.required, this.samePasswordValidators.bind(this)])
  });
  profileDisable() {
    this.profileForm.disable();
  }    
  profileEnable() {
    this.profileForm.enable();
  } 
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  samePasswordValidators(control: FormControl): { [s: string] : boolean } | null {
    return this.profileForm !== undefined && this.profileForm.get('password')!.value === control.value
      ? null
      : { notSamePassword: true }
  }

  ngOnInit(): void {
  }

}