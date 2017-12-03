import { Component, OnInit, Input } from '@angular/core';
import { BusyService } from '../busy.service';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.css']
})
export class BusyComponent implements OnInit {
  @Input() show = false;

  constructor(private service: BusyService) { }

  ngOnInit() {
    this.service._register(this);
  }
}
