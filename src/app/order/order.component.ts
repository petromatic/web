import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BusyService } from '../busy.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  uid: string;
  orders: Observable<any>;
  start: string = null;
  limit: number = 10;

  constructor(private route: ActivatedRoute, db: AngularFireDatabase, private busy : BusyService) {
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      if(this.uid)
      {
        this.orders = db.list(
          '/user_orders/'+this.uid+'/-L1Ju4JdIm63ciTdqA6F/-L1JxWQalVKFrpY1iqCq',
          ref => ref.startAt(this.start).limitToFirst(this.limit) ).snapshotChanges().map( actions => {
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
