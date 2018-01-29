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
  full: boolean = false;
  capacity: number = 0;
  trucks: Observable<any[]>;
  drivers: Observable<any[]>;

  constructor(private location: Location, private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.order = {
    };
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      if(this.userId)
      {
        this.drivers = this.db.list('/user_drivers/'+this.userId).snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        this.trucks = this.db.list('/user_trucks/'+this.userId).snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
      }
      else
      {
      }
   });
   }

  ngOnInit() {
  }

  onTruckChange(event){
    const sel = event.target;
    this.capacity = parseInt(sel.options[sel.selectedIndex].dataset.capacity);
  }

  save()
  {
    if(this.userId && this.order.truck && this.order.driver)
    {
      let key = this.db.list(`/user_orders/${this.userId}`).push(undefined).key;
      let time = {"localtime":+new Date(),"timestamp":{".sv": "timestamp"}};
      let updates = {};
      updates[`${this.order.truck}/${this.order.driver}/${key}`] = {...time, "value": this.order.value};
      updates[`orders/${key}`] = {...time, ...this.order};
      let model = this.db.object(`/user_orders/${this.userId}`);
      model.update(updates).then( (order) =>{
        this.location.back();
      });
    }
    else
    {
    }
  }

}
