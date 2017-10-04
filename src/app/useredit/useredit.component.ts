import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  id: string;
  userModel: FirebaseObjectObservable<any>;
  user: any;
  changed: boolean = false;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id)
      {
        this.userModel = this.db.object('/users/'+this.id, { preserveSnapshot: true });
        console.log(this.userModel);
        this.userModel.subscribe( user => {
          this.user = user.val()
        });
      }
      else
      {
        this.user = {};
      }
   });
   }

  ngOnInit() {
  }

  save()
  {
    console.log("save");
    if(!this.id)
    {
      console.log("New");
      this.db.list('/users').push(this.user).then( (user) => {
        console.log(user);
        this.id = user.key;
        this.userModel = this.db.object('/users/'+this.id, { preserveSnapshot: true });
        this.changed = false;
      });
    }
    else
    {
      this.userModel.update(this.user).then( (user) =>{
        this.changed = false;
      });
    }
  }
}
