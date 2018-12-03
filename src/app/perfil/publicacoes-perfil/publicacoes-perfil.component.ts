import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'; 
import * as firebase from 'firebase'


@Component({
  selector: 'app-publicacoes-perfil',
  templateUrl: './publicacoes-perfil.component.html',
  styleUrls: ['./publicacoes-perfil.component.css']
})
export class PublicacoesPerfilComponent implements OnInit {
  
  public email: string
  public publicacoes: any
  constructor( private bd: Bd ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
      this.atualizarTimeLine()

    })
  }


  public atualizarTimeLine(): void {
    this.bd.consultaPerfilPublicacoes(this.email)
    .then( (publicacoes:any) =>{
      this.publicacoes = publicacoes
      console.log(publicacoes.url_imagem)
    } )
  }

}
