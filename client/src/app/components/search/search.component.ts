import { UserType } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileType } from 'src/app/models/profile';
import { formatDate } from '@angular/common';
=======
>>>>>>> b183f6361ea7eec243769b97121ef1211e925723

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: UserType[] = [];
<<<<<<< HEAD
  profile!: ProfileType[];

  currentDate: Date = new Date();

  constructor(private profileService: ProfileService,private userService: UserService ,private router: Router ) {
    this.getUsers();
    this.getProfile();
=======

  constructor(private userService: UserService, private router: Router ) {
    this.getUsers();
>>>>>>> b183f6361ea7eec243769b97121ef1211e925723
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
<<<<<<< HEAD
  }

  getProfile() {
   this.profileService.getAll().subscribe(
      response => {
        this.profile = response;
        console.log("prof " + this.profile)
      }
    )
  }

  getProfileById(userId: number) : ProfileType {
    let prof = this.profile?.find(prof => prof.userID == userId-1);
    console.log(userId);
    console.log(prof);

    return prof ? prof : {userID: 0, id: 0, firstname: "", lastname: "", description: "", age: 0, birthDate: this.currentDate, interests: [], imagePath: ""} 
  }

 
=======

  }
>>>>>>> b183f6361ea7eec243769b97121ef1211e925723

}
