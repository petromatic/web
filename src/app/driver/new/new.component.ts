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
export class NewDriverComponent implements OnInit {
  driver: any;
  uid: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private _location: Location) {
    this.driver = {};
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
    let model = this.db.list('/user_drivers/'+this.uid);
    model.push(this.driver).then( (driver) =>{
      this._location.back();
    });
  }
}
