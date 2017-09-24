import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  emailError: boolean = false;
  passError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    public userService: UserService
  ) { 

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginSuccess(auth) {
    this.userService.setAuthState(auth);
    this.router.navigateByUrl(this.returnUrl);
  }

  login(email, pass)
  {
    this.emailError = false;
    this.passError = false;
    var self = this;
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(auth => {
        this.loginSuccess(auth);
      })
      .catch(function(error: firebase.FirebaseError) {
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          self.passError = true;
        } else if(errorCode === 'auth/user-not-found') {
          self.passError = true;
        } else if (errorCode === 'auth/invalid-email') {
          self.emailError = true;
        } else {
        }
        console.log(error);
      });
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(auth => {
        this.loginSuccess(auth);
      });
  }
}
