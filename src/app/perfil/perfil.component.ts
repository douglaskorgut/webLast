import { Component, OnInit , ViewChild} from '@angular/core';
import {Autenticacao} from '../autenticacao.service'
import { MqttService , IMqttMessage} from '../../../node_modules/ngx-mqtt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private _opened: boolean = false;
  events: string[] = [];
  opened: boolean;
  @ViewChild('publicacoes-perfil') public publicacoesPerfil: any

  constructor(private autenticacao: Autenticacao,private _mqttService: MqttService) { }

  ngOnInit() {
  }
  public sair(): void {
    this.autenticacao.sair()
  }

  public doRecognition(): void{
    this._mqttService.publish("horus/system/recognize","true").subscribe({
      next: () => {
          console.log("Do recognition")
      },
      error: (error: Error) => {
          console.log('Something went wrong on recognition')
      }
   });
  }

  public atualizarTimeLine(): void {
    this.publicacoesPerfil.test()
    //  this.publicacoesPerfil.atualizarTimeLine()
  }




}
