import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserType } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ProfileType } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { sha512 } from 'js-sha512';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  constructor(private userService:UserService,private profileService:ProfileService) { }
  profileDisable() {
    this.profileForm.disable();
  }    
  profileEnable() {
    this.profileForm.enable();
  } 
  
  onSubmit() {
    let user: UserType = this.profileForm.getRawValue();
    let profile: ProfileType = this.profileForm.getRawValue();
    user.password = sha512(this.profileForm.get('password')?.value)
    this.profileService.put(profile).subscribe(
      response => {
        console.log(response);
      },
    )
    this.userService.put(user).subscribe(
      response => {
        console.log(response);
      },
    )
    console.warn(this.profileForm.value);
  }
  samePasswordValidators(control: FormControl): { [s: string] : boolean } | null {
    return this.profileForm !== undefined && this.profileForm.get('password')!.value === control.value
      ? null
      : { notSamePassword: true }
  }

  ngOnInit(): void {
    
    this.profileForm = new FormGroup({
      
      fullName: new FormControl(null, [Validators.required] ),
      userName: new FormControl(null, [Validators.required, Validators.minLength(5)] ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required]),
      opassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      pswrepeat: new FormControl(null, [Validators.required, this.samePasswordValidators.bind(this)]),
      interest: new FormControl(null),
      description: new FormControl(null),
    });
    
    this.userService.getById(140).subscribe(
      response => {
        console.log(response);
      },
    )
    this.profileService.getById(140).subscribe(
      response => {
        console.log(response);
      },
    )
    
  }

}