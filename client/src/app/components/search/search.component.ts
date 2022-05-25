import { UserType } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: UserType[] = [];

  constructor(private userService: UserService, private router: Router ) {
    this.getUsers();
   }

  ngOnInit(): void {
  }

  getUsers(){
    this.userService.getAll().subscribe(
      response => {
        this.user = response;
        console.log(this.user);
      }
    )

  }

}
