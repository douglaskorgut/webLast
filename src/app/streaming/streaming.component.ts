import { Component, OnInit } from '@angular/core';
import {Autenticacao} from '../autenticacao.service'
import { MqttService , IMqttMessage} from '../../../node_modules/ngx-mqtt';
import {Bd} from '../bd.service'
import * as firebase from 'firebase'

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {

  private recordVideo: boolean = false
  private enableStreaming: boolean = false
  private email: string

  constructor(private autenticacao: Autenticacao,private bd: Bd, private _mqttService: MqttService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
     
      this.publishEmail(btoa(this.email))
 
 
     })
  }

  public changeButtonState(): void{
    if ( this.recordVideo == false ) {
      this.recordVideo = true
      console.log("Record video = true")
      this._mqttService.publish("video/record","true").subscribe({
        next: () => {
            console.log("Video published")
        },
        error: (error: Error) => {
            console.log('Video not published')
        }
     });
    } else {
      this.recordVideo = false
      console.log("Record video = false")
      this._mqttService.publish("video/record","false").subscribe({
        next: () => {
            console.log("Video published")
        },
        error: (error: Error) => {
            console.log('Video not published')
        }
     });
    }
  }


  public takePicture():void{
    this._mqttService.publish("image/record","true").subscribe({
      next: () => {
          console.log("Image published")
      },
      error: (error: Error) => {
          console.log('Image not published')
      }
   });
  }

  public changeStreamingState():void{
    if ( this.enableStreaming == false ) {
      this.enableStreaming = true
      console.log("Record video = true")
      this._mqttService.publish("streaming","true").subscribe({
        next: () => {
            console.log("Streaming published")
        },
        error: (error: Error) => {
            console.log('Streaming not published')
        }
     });
    } else {
      this.enableStreaming = false
      console.log("Record video = false")
      this._mqttService.publish("streaming","false").subscribe({
        next: () => {
            console.log("Not streaming published")
        },
        error: (error: Error) => {
            console.log('not streaming not published')
        }
     });
    }
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public publishEmail(email:string): void{
    this._mqttService.publish("email",email).subscribe({
      next: () => {
          console.log("Email published")
      },
      error: (error: Error) => {
          console.log('Email not published')
      }
   });
  }

}
