import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { BusyService } from '../busy.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  id: string;
  trucks: Observable<any>;
  start: string = null;
  limit: number = 10;

  constructor(private route: ActivatedRoute, db: AngularFireDatabase, private busy : BusyService) {
    this.route.params.subscribe(params => {
      this.id = params['uid'];
      if(this.id)
      {
        this.trucks = db.list('/user_trucks/'+this.id, ref => ref.startAt(this.start).limitToFirst(this.limit) ).snapshotChanges().map( actions => {
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
