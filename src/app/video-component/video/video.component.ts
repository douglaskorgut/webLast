import { Component, OnInit,  } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Bd} from '../../bd.service';
import * as firebase from 'firebase';
import { MqttService , IMqttMessage} from '../../../../node_modules/ngx-mqtt';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


  private email: string;
  public publicacoes: any;


  constructor(private bd: Bd, private _mqttService: MqttService, public sanitizer: DomSanitizer) {
    // SUBSCRIBING TO TOPICS

    // this._mqttService.observe('topico/video/record').subscribe((message: IMqttMessage) => {
    //   this.message = message.payload.toString();
    // });

  }


  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
     this.email = user.email;
     this.atualizaVideoTimeline();
     this.publishEmail(btoa(this.email));
    });
  }


  public publishVideo(email: string): void {
    this._mqttService.publish('/tcciotutfpr/video/record', 'true').subscribe({
      next: () => {
          console.log('Video published');
      },
      error: (error: Error) => {
          console.log('Video not published');
      }
   });
  }

  public publishEmail(email: string): void {
    this._mqttService.publish('/tcciotutfpr/email', email).subscribe({
      next: () => {
          console.log('Email published');
      },
      error: (error: Error) => {
          console.log('Email not published');
      }
   });
  }

  public atualizaVideoTimeline() {
    this.bd.consultaPublicacoesVideo(this.email)
    .then( (publicacoes: any) => {
      this.publicacoes = publicacoes;


    } );
  }

}
