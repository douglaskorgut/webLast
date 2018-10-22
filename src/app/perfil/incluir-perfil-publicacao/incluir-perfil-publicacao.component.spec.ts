import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirPerfilPublicacaoComponent } from './incluir-perfil-publicacao.component';

describe('IncluirPerfilPublicacaoComponent', () => {
  let component: IncluirPerfilPublicacaoComponent;
  let fixture: ComponentFixture<IncluirPerfilPublicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirPerfilPublicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirPerfilPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
