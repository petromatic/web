import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  userId : string;
  userTransactions: FirebaseListObservable<any>;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params['uid'];
      if(this.userId)
      {
        this.userTransactions = this.db.list('/user_transactions/'+this.userId, {
          query: {
            orderByChild: 'timestamp',
            limitToLast: 10
          }
        });
      }
   });
  }
}
