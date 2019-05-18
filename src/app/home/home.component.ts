import { Component, OnInit, ViewChild} from '@angular/core';
import {Autenticacao} from '../autenticacao.service'
import * as firebase from 'firebase'
import {Bd} from '../bd.service'
import { MqttService , IMqttMessage} from 'ngx-mqtt'
import {items} from './items'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public items: any[] = items;
  private _opened: boolean = false;
  private email: string
  events: string[] = [];
  opened: boolean;

  @ViewChild('publicacoes') public publicacoes: any
 

  constructor(private autenticacao: Autenticacao,private _mqttService: MqttService, private bd: Bd) {
    

   }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
     
      this.setUserLogged(btoa(this.email))
 
 
     })
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  public sair(): void {
    this.bd.publicarUsuarioLogado("none")
    this.autenticacao.sair()
  }

  public setUserLogged(email:string){
    this.bd.publicarUsuarioLogado(email)
    }

  public atualizarTimeLine(): void { 
    this.publicacoes.atualizarTimeLine()
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

}
