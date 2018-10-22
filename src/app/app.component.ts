import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase'
import * as mqtt from 'mqtt';
import { MqttService , IMqttMessage} from '../../node_modules/ngx-mqtt';
import { Subscription } from '../../node_modules/rxjs';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';
  private _opened: boolean = false;
  private subscription: Subscription;
  public message: string;

  constructor (private _mqttService: MqttService){
    // this.subscription = this._mqttService.observe('topico/douglao').subscribe((message: IMqttMessage) => {
    //   this.message = message.payload.toString();
    //   //console.log(this.message)
      
    // });


    console.log("SUDPSUDOSAUDA")
  }

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


  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
