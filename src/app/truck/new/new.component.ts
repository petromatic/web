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
export class NewTruckComponent implements OnInit {
  truck: any;
  uid: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private _location: Location) {
    this.truck = {};
    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      if(this.uid)
      {
            
      }
      else
      {
        
      }
    });
   }

  ngOnInit() {
  }

  save(){
    let model = this.db.list('/user_trucks/'+this.uid);
    model.push(this.truck).then( (truck) =>{
      this._location.back();
    });
  }
}
