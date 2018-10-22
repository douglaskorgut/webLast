import { Component, OnInit, ViewChild } from '@angular/core';
import {Autenticacao} from '../autenticacao.service'
import { MqttService , IMqttMessage} from '../../../node_modules/ngx-mqtt';
import {Bd} from '../bd.service'
import * as firebase from 'firebase'

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit {

  private _opened: boolean = false;
  private email: string
  private recordVideo: boolean = false
  events: string[] = [];
  opened: boolean;
  @ViewChild('video') public publicacoes: any
  
  constructor(private autenticacao: Autenticacao,private bd: Bd, private _mqttService: MqttService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
     
      this.publishEmail(btoa(this.email))
 
 
     })
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void { 
    this.publicacoes.atualizarTimeLine()
  }

  

  public shootVideo():void{

    this._mqttService.publish("shootVideo/record","true").subscribe({
      next: () => {
          console.log("Video started")
      },
      error: (error: Error) => {
          console.log('Video not started')
      }
   });


    this._mqttService.publish("video/record","true").subscribe({
      next: () => {
          console.log("Video published")
      },
      error: (error: Error) => {
          console.log('Video not published')
      }
   });


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
