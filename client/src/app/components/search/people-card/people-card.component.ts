import { UserType } from 'src/app/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})
export class PeopleCardComponent implements OnInit {

  @Input()
  user!: UserType;

  @Output()
  actionEmit = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void 
  {

  }

 

 

}
