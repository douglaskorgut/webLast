import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { Bd } from './bd.service'
import {Mqtt} from './mqtt.service'
import {Progresso} from './progresso.service'
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { SidebarModule } from 'ng-sidebar';
import { Observable } from 'rxjs';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { ROUTES } from './app.routes'

import { Autenticacao } from './autenticacao.service'
import { AutenticacaoGuard } from './autenticacao-guard.service'
import {NavcompComponent} from './navcomp/navcomp.component'
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { VideoComponent } from './video-component/video/video.component';
import { StreamingComponent } from './streaming/streaming.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VideoComponentComponent } from './video-component/video-component.component';
import { PublicacoesPerfilComponent } from './perfil/publicacoes-perfil/publicacoes-perfil.component';
import { IncluirPerfilPublicacaoComponent } from './perfil/incluir-perfil-publicacao/incluir-perfil-publicacao.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MenuModule } from '@progress/kendo-angular-menu';


export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  protocol:'ws',
  port: 8080,
  path: '/ws'
};

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    VideoComponentComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent,
    VideoComponent,
    StreamingComponent,
    NavcompComponent,
    MenuComponent,
    PerfilComponent,
    PublicacoesPerfilComponent,
    IncluirPerfilPublicacaoComponent,
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    SidebarModule.forRoot(),
    ContextMenuModule,
    MatAutocompleteModule,
    MatBadgeModule,
    Ng5SliderModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    
    BrowserModule,   
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    RouterModule.forRoot(ROUTES),

    MenuModule
  ],
  providers: [ Autenticacao, AutenticacaoGuard, Bd, Progresso, Mqtt ],
  bootstrap: [AppComponent]
})
export class AppModule { }
