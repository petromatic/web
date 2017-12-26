import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-addcredit',
  templateUrl: './addcredit.component.html',
  styleUrls: ['./addcredit.component.css']
})
export class AddCreditComponent implements OnInit {
  userId: string = null;
  users: Observable<any[]>;
  amount: number = 0;
  changed: boolean = false;

  constructor(private location: Location, private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.users = db.list('/users').valueChanges();

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
    this.changed = false;
    if(this.userId && this.amount > 0)
    {
      let transactionsModel = this.db.list('/user_transactions/'+this.userId);
      transactionsModel.push({"localtime":+new Date(),"value":this.amount,"timestamp":{".sv": "timestamp"}}).then( (transaction) =>{
        this.location.back();
      });
    }
    else
    {
    }
  }

}
