import { Injectable } from '@angular/core';
import { BusyComponent } from './busy/busy.component';

@Injectable()
export class BusyService {
  private busy : BusyComponent;

  constructor() { }
  
  _register(busy: BusyComponent): void {
    this.busy = busy;
  }

  show(): void {
    this.busy.show = true;
  }

  hide(): void {
    this.busy.show = false;
  }
}
