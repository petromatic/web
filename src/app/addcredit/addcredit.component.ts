import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-addcredit',
  templateUrl: './addcredit.component.html',
  styleUrls: ['./addcredit.component.css']
})
export class AddCreditComponent implements OnInit {
  userId: string = null;
  users: FirebaseListObservable<any[]>;
  amount: number = 0;
  changed: boolean = false;

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.users = db.list('/users');

    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      if(this.userId)
      {
        
      }
      else
      {
      }
   });
  }

  ngOnInit() {
  }

  save()
  {
    if(this.userId && this.amount > 0)
    {
      let transactionsModel = this.db.list('/user_transactions/'+this.userId);
      transactionsModel.push({"localtime":+new Date(),"value":this.amount,"timestamp":{".sv": "timestamp"}}).then( (transaction) =>{
        console.log(transaction)
        this.changed = false;
      });
    }
    else
    {
    }
  }

}
