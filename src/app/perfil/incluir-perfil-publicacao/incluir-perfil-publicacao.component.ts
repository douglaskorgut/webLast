import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { Bd } from '../../bd.service'
import * as firebase from 'firebase'
import { Progresso } from '../../progresso.service'
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs'
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-perfil-publicacao',
  templateUrl: './incluir-perfil-publicacao.component.html',
  styleUrls: ['./incluir-perfil-publicacao.component.css']
})

export class IncluirPerfilPublicacaoComponent implements OnInit {

  public email: string
  public imagem: any
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number
  public bdMessage: string = ""
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null),
    'id'     : new FormControl(null)
  })

  constructor(private bd: Bd,private progresso: Progresso) { }

  
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
    })
  }

  public publicar(): void {
    
    this.bd.publicarBuffer({
      email: this.email ,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
      id: this.formulario.value.id
    })
    let continua = new Subject()
    continua.next(true)
    let acompanhamentoUpload = Observable.interval(1500)
      .subscribe(() => {
      //console.log(this.progresso.status)
     // console.log(this.progresso.estado)
      this.progressoPublicacao = 'andamento'
      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred/this.progresso.estado.totalBytes)*100)
      
      if(this.progresso.status === 'concluido') {
        acompanhamentoUpload.unsubscribe()
        this.progressoPublicacao = 'concluido'
        this.atualizarTimeLine.emit()
        continua.next(false)

      }
    })

    this.bd.publicarPerfil({
      email: this.email ,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
      id: this.formulario.value.id
    })
    this.atualizarTimeLine.emit()

    
    
  }

  public preparaImagemUpload(event:Event): void{
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
