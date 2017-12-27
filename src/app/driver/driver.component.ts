import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { BusyService } from '../busy.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  id: string;
  drivers: Observable<any>;
  start: string = null;
  limit: number = 10;

  constructor(private route: ActivatedRoute, db: AngularFireDatabase, private busy : BusyService) {
    this.route.params.subscribe(params => {
      this.id = params['uid'];
      if(this.id)
      {
        this.drivers = db.list('/user_drivers/'+this.id, ref => ref.startAt(this.start).limitToFirst(this.limit) ).snapshotChanges().map( actions => {
          return actions.map(action => ({ key: action.key, ...action.payload.val() }));
        });    
      }
      else
      {
        
      }
    });
  }
  
  ngOnInit() {
  }

}
