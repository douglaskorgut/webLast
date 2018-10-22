import { Routes } from '@angular/router'

import { AcessoComponent } from './acesso/acesso.component'
import { HomeComponent } from './home/home.component'
import {VideoComponentComponent} from './video-component/video-component.component'
import {StreamingComponent} from './streaming/streaming.component'
import {PerfilComponent} from "./perfil/perfil.component"
import { AutenticacaoGuard } from './autenticacao-guard.service'

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
    { path: 'home', component: HomeComponent, canActivate: [ AutenticacaoGuard ] },
    { path: 'video', component: VideoComponentComponent, canActivate: [ AutenticacaoGuard ] },
    { path: 'streaming', component: StreamingComponent, canActivate: [ AutenticacaoGuard ] },
    { path: 'perfil', component: PerfilComponent, canActivate: [ AutenticacaoGuard ] },
    
]