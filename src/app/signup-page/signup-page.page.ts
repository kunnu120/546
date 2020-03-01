import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
})
export class SignupPagePage implements OnInit {
  private email: string;
  private password: string;
  constructor() { 
  this.email = "";
  this.password = "";
  }
  ngOnInit() {
  }
  signup() {
    firebase.auth().createUserWithEmailAndPassword()
  }
}
