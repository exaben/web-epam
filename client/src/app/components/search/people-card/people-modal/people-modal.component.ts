import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileType } from 'src/app/models/profile';

@Component({
  selector: 'app-people-modal',
  templateUrl: './people-modal.component.html',
  styleUrls: ['./people-modal.component.css']
})
export class PeopleModalComponent implements OnInit {

  constructor() { }

  @Input()
  profile!: ProfileType;

  ngOnInit(): void {
  }

  toggle = true;
  status = 'Enable';

  heartChangeColor() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
 
}
