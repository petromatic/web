import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BusyService } from '../busy.service'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<any[]>;
  start: string = null;
  limit: number = 10;

  constructor(db: AngularFireDatabase, private busy : BusyService) {
    this.users = db.list('/users', ref => ref.startAt(this.start).limitToFirst(this.limit) ).snapshotChanges().map( actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.users.subscribe( (e)=>{
      busy.hide();
      console.log(e);
    });
  }

  ngOnInit() {
    this.busy.show();
  }

}
