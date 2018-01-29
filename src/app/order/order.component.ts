import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BusyService } from '../busy.service'
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(
    private route: ActivatedRoute, 
    private db: AngularFireDatabase, 
    private busy : BusyService,
    public auth: AngularFireAuth
  ) {
    this.busy.show();
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      if(this.uid)
      {
        this.fetchOrders();
      }
      else
      {
        this.auth.authState.subscribe( user => {
          this.uid = user.uid;
          if(this.uid)
            this.fetchOrders(); 
        });
      }
    });
  }

  fetchOrders(){
    this.orders = this.db.list(
      `/user_orders/${this.uid}/orders`,
      ref => ref.startAt(this.start).limitToFirst(this.limit) ).snapshotChanges().map( actions => {
        this.busy.hide();
        return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  ngOnInit() {
  }

}
