import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'; 
import { items } from './items';
import { ContextMenuSelectEvent } from '@progress/kendo-angular-menu';
import * as firebase from 'firebase'
@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  
  public email: string
  public publicacoes: any
  public items: any[] = items;
  public selected: string;

  constructor( private bd: Bd ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
      this.atualizarTimeLine()

    })
  }
  public onSelect(e: ContextMenuSelectEvent): void {
    
    if ( e.item.text === "Salvar foto" ){
    
     this.bd.salvarCaptura(e.target.data.key,btoa(this.email))
     console.log("eta")
      
    } else {
      console.log("vai deletar a foto")
      this.bd.deletarCaptura(e.target.data.key,btoa(this.email))  
    }

    this.atualizarTimeLine()
    
  }

  public deletarReferenciaDoFirebase():void{

  }

  public deletarFotoDoStorage():void{

  }

  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
    .then( (publicacoes:any) =>{
      this.publicacoes = publicacoes
      console.log(publicacoes.url_imagem)
    } )
  }

}
