import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: UserType[] = [];

  constructor(private userService: UserService) { 
    this.getUser();
  }

  ngOnInit(): void {
  }

  getUser(){
    this.userService.getAll().subscribe(
      response =>{
        this.users = response;
        console.log(response);
      }
      
    )
      
    }
  }

