import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewOrderComponent implements OnInit {
  userId: string = null;
  order: any;
  amount: number = 0;
  changed: boolean = false;

  constructor(private location: Location, private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.order = {
      truck: '-L1Ju4JdIm63ciTdqA6F',
      driver:'-L1JxWQalVKFrpY1iqCq'
    };
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
    if(this.userId && this.order.truck && this.order.driver)
    {
      let model = this.db.list('/user_orders/'+this.userId+'/'+this.order.truck+'/'+this.order.driver);
      model.push({"localtime":+new Date(),"timestamp":{".sv": "timestamp"}, ...this.order}).then( (order) =>{
        this.location.back();
      });
    }
    else
    {
    }
  }

}
