import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';


  ngOnInit(): void {
    var config = {
      apiKey: "AIzaSyCp0RIPqODI_Zxsrfu48Yt087XD8orxXWg",
      authDomain: "tccfirstattempt.firebaseapp.com",
      databaseURL: "https://tccfirstattempt.firebaseio.com",
      projectId: "tccfirstattempt",
      storageBucket: "tccfirstattempt.appspot.com",
      messagingSenderId: "994487973781"
    };

    firebase.initializeApp(config)
  }

}
