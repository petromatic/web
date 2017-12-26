import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'
import { UUID } from 'angular2-uuid';


import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  id: string;
  userModel: AngularFireObject<any>;
  user: any;
  changed: boolean = false;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id)
      {
        this.userModel = this.db.object('/users/'+this.id);
        console.log(this.userModel);
        this.userModel.valueChanges().subscribe(
          (user) => this.user = user
        );
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
    if(!this.id)
    {
      const afAuth = new AngularFireAuth(firebase.initializeApp(environment.firebase2,"tmpauth"));
      
      let email = this.user.email;
      let password = UUID.UUID();
      afAuth.auth.createUserWithEmailAndPassword(email, password).then( (afUser) =>{
        this.id = afUser.uid;
        this.userModel = this.db.object('/users/'+this.id);
        this.userModel.update(this.user).then( (user) =>{
          this.changed = false;
        });
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
