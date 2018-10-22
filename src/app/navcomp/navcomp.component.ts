import { Component, OnInit, ViewChild } from '@angular/core';
import {Autenticacao} from '../autenticacao.service'


@Component({
  selector: 'app-navcomp',
  templateUrl: './navcomp.component.html',
  styleUrls: ['./navcomp.component.css']
})
export class NavcompComponent implements OnInit {

  
  events: string[] = [];
  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }



}
