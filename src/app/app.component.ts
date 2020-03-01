import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyCfhVRRwmpg75nRzEhNg86RRdYsxTRtYmE",
  authDomain: "gamecockstore-59d82.firebaseapp.com",
  databaseURL: "https://gamecockstore-59d82.firebaseio.com",
  projectId: "gamecockstore-59d82",
  storageBucket: "gamecockstore-59d82.appspot.com",
  messagingSenderId: "965847510987",
  appId: "1:965847510987:web:9183d7eb01b5961cf5904e",
  measurementId: "G-FPQH1560SV"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
  }
}
