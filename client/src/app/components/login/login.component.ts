import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/http-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor( private authService: AuthService, private router: Router) { 
  }

 onSubmit(): void {
   if(this.loginForm.valid){
     let user = this.loginForm.getRawValue();
     user.password = (user.password);

     this.authService.login(user).subscribe(
       response => {
         localStorage.setItem("user", JSON.stringify(response));
         this.router.navigate(['../profile']);
       },error => {
        this.loginForm.get('username')?.setErrors({incorrect: true})
      }
     )
   }

 }

 ngOnInit(): void {
  this.loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });
  }
}