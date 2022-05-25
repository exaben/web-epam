import { Component, Input, OnInit } from '@angular/core';
import { ProfileType } from 'src/app/models/profile';
import { UserType } from 'src/app/models/user';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})
export class PeopleCardComponent implements OnInit {

  @Input()
  user!: UserType;

  @Input()
  profile!: ProfileType;

  constructor() { }

  ngOnInit(): void {
  }

}
