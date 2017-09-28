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

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userModel = this.db.object('/users/'+this.id, { preserveSnapshot: true });
      this.userModel.subscribe( user => {
        this.user = user.val()
      });
   });
   }

  ngOnInit() {
  }

}
