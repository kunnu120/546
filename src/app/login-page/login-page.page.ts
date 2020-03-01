import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  private email: string;
  private password: string;
  constructor(private route: Router) { 

    this.email = "";
    this.password = "";
  }

  ngOnInit() {
  }
    goToTab1() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(dat => {
        this.email = "";
        this.password = "";
        this.route.navigate(['tabs/tab1']);
      }).catch(err => {
        alert(err);
      });
    }

    goToSignupPage() {
      this.route.navigate(['signup-page']);
    }

    goToGoogleLogin() {

        var provider = new firebase.auth.GoogleAuthProvider;
        provider.addScope('profile');
        provider.addScope('email');
        var self = this;
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.providerId;

          var user = result.user;
          console.log(user);
          console.log('login succeeded')
          self.route.navigate(["/tabs/tab1"]);
        });
    }
}
