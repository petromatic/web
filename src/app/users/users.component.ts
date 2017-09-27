import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  start: string = null;
  limit: number = 10;

  constructor(db: AngularFireDatabase) {
    this.users = db.list('/users', {
      query: {
        startAt: this.start,
        limitToFirst: this.limit
      }
    });
  }

  ngOnInit() {
  }

}
