import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-people-modal',
  templateUrl: './people-modal.component.html',
  styleUrls: ['./people-modal.component.css']
})
export class PeopleModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggle = true;
  status = 'Enable';

  heartChangeColor() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
 
}
