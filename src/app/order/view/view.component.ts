import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewOrderComponent implements OnInit {
  userId: string = null;
  orderId: string = null;
  order:Observable<any>;
  qrdata: any = {};
  qrjson: string;

  constructor(private location: Location, private route: ActivatedRoute, public db: AngularFireDatabase) { 
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.orderId = params['oid'];
      if(this.orderId)
      {
        this.order = this.db.object(`/user_orders/${this.userId}/orders/${this.orderId}`).valueChanges();
        this.order.subscribe(val => {
          console.log(val);
          this.qrdata = {
            "invoiceId": this.orderId,
            "driver": `${val.driver.name} ${val.driver.surname} | ${val.driver.dni} `,
            "plate": val.truck.plate,
            "liters": val.value
          };
          this.qrjson = JSON.stringify(this.qrdata);
        });
      }
    });
       
  }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }
}
