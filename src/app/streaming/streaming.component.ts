import { Component, OnInit } from '@angular/core';
import {Autenticacao} from '../autenticacao.service';
import { MqttService , IMqttMessage} from '../../../node_modules/ngx-mqtt';
import {Bd} from '../bd.service';
import * as firebase from 'firebase';
import { Options, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {

  private recordVideo = false;
  private enableStreaming = false;
  private email: string;
  private xValue = '50';
  private yValue = '50';

  logXText = '';
  logYText = '';

  private yOptions: Options = {
    floor: 0,
    ceil: 100
  };

  private xOptions: Options = {
    floor: 0,
    ceil: 100
  };

  constructor(private autenticacao: Autenticacao, private bd: Bd, private _mqttService: MqttService) {

  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.publishEmail(btoa(this.email));


     });
  }

  onYValueChange(changeContext: ChangeContext): void {

    this.logYText = `${this.yValue}`;
    this._mqttService.publish('/tcciotutfpr/slider/y', this.logYText).subscribe({
      next: () => {
          console.log('X position published');
      },
      error: (error: Error) => {
          console.log('X position not published');
      }
   });
  }

  onXValueChange(changeContext: ChangeContext): void {

    this.logXText = `${this.xValue}`;
    this._mqttService.publish('/tcciotutfpr/slider/x', this.logXText).subscribe({
      next: () => {
          console.log('Y position published');
      },
      error: (error: Error) => {
          console.log('Y position not published');
      }
   });
  }

  public changeButtonState(): void {
    if ( this.recordVideo == false ) {
      this.recordVideo = true;
      console.log('Record video = true');
      this._mqttService.publish('/tcciotutfpr/video/record', 'true').subscribe({
        next: () => {
            console.log('Video published');
        },
        error: (error: Error) => {
            console.log('Video not published');
        }
     });
    } else {
      this.recordVideo = false;
      console.log('Record video = false');
      this._mqttService.publish('/tcciotutfpr/video/record', 'false').subscribe({
        next: () => {
            console.log('Video published');
        },
        error: (error: Error) => {
            console.log('Video not published');
        }
     });
    }
  }


  public takePicture(): void {
    this._mqttService.publish('/tcciotutfpr/image/record', 'true').subscribe({
      next: () => {
          console.log('Image published');
      },
      error: (error: Error) => {
          console.log('Image not published');
      }
   });
  }

  public changeStreamingState(): void {
    if ( this.enableStreaming == false ) {
      this.enableStreaming = true;
      console.log('Record video = true');
      this._mqttService.publish('/tcciotutfpr/streaming', 'true').subscribe({
        next: () => {
            console.log('Streaming published');
        },
        error: (error: Error) => {
            console.log('Streaming not published');
        }
     });
    } else {
      this.enableStreaming = false;
      console.log('Record video = false');
      this._mqttService.publish('/tcciotutfpr/streaming', 'false').subscribe({
        next: () => {
            console.log('Not streaming published');
        },
        error: (error: Error) => {
            console.log('not streaming not published');
        }
     });
    }
  }

  public sair(): void {
    this.autenticacao.sair();
    this.bd.publicarUsuarioLogado('none');
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

}
