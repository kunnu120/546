import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
})
export class SignupPagePage implements OnInit {
  private email: string;
  private password: string;
  constructor(private route: Router) { 
  this.email = "";
  this.password = "";
  }
  ngOnInit() {
  }
  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(dat => {
        this.email = "";
        this.password = "";
        this.route.navigate(['login-page']);
    }).catch(err => {
        alert(err);
    });
  }
}
