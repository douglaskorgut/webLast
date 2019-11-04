import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase'
import { items } from './items';
import { ContextMenuSelectEvent } from '@progress/kendo-angular-menu';
import { MqttService , IMqttMessage} from '../../../../node_modules/ngx-mqtt';


@Component({
  selector: 'app-publicacoes-perfil',
  templateUrl: './publicacoes-perfil.component.html',
  styleUrls: ['./publicacoes-perfil.component.css']
})
export class PublicacoesPerfilComponent implements OnInit {

  public email: string
  public publicacoes: any
  public items: any[] = items;
  constructor( private bd: Bd, private _mqttService: MqttService ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
      this.atualizarTimeLine()

    })
  }

  public onSelect(e: ContextMenuSelectEvent): void {

    if ( e.item.text === "Deletar foto" ){
      console.log("Vai deletar a foto")
     this.bd.deletarPerfilCaptura(e.target.data.key,btoa(this.email))

    } else {
      console.log("Vai descadastrar a face")
      let picRef = e.target.data.key

      console.log(e.target.data.titulo)

      this.bd.descadastrarFace(picRef, btoa(this.email), e.target.data.titulo)

      console.log(e.target.data.id)
      this._mqttService.publish("horus/system/unrecognize","true").subscribe({
        next: () => {
            console.log("Unrecognition published")
        },
        error: (error: Error) => {
            console.log('Unrecognition not published')
        }
     });
    }

    this.atualizarTimeLine()

  }

  public atualizarTimeLine(): void {
    this.bd.consultaPerfilPublicacoes(this.email)
    .then( (publicacoes:any) => {
      this.publicacoes = publicacoes
      console.log(publicacoes.url_imagem)
    } )
  }

}
