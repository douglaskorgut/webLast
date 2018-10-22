import { Component, OnInit, ViewChild} from '@angular/core';
import {Autenticacao} from '../autenticacao.service'
import { MqttService , IMqttMessage} from '../../../node_modules/ngx-mqtt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private _opened: boolean = false;
  events: string[] = [];
  opened: boolean;
  @ViewChild('publicacoes') public publicacoes: any

  constructor(private autenticacao: Autenticacao,private _mqttService: MqttService) { }

  ngOnInit() {
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
