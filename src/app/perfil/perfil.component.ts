import { Component, OnInit ,ViewChild} from '@angular/core';
import {Autenticacao} from '../autenticacao.service'

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

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }
  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void { 

    this.publicacoesPerfil.atualizarTimeLine()
  }


}
