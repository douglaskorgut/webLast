import * as firebase from 'firebase'
import  {Injectable} from '@angular/core'
import { Progresso } from './progresso.service';
@Injectable()
export class Bd{

    constructor(private progresso: Progresso){
    }

    public publicar (publicacao: any): void {
    
    firebase.database().ref('publicacoes/'+btoa(publicacao.email))
    .push({ titulo: publicacao.titulo})
        .then( (resposta:any) => {
            let nomeImagem = resposta.key
                firebase.storage().ref()
            .child("imagens/"+nomeImagem)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED, 
                    // Acompanhamento do progresso do upload
                (snapshot:any) =>{
                    this.progresso.status = 'andamento'
                    this.progresso.estado = snapshot
                    //console.log('snapshot: ',snapshot)
                },
                (error) => {
                    this.progresso.status = 'erro'
                    //console.log(error)
                },
                () =>{
                // console.log('uploadCompleto')
                    this.progresso.status = 'concluido'

                }
            )
        })

    }

    public consultaPublicacoes(emailUsuario:string): Promise<any>{


        return new Promise ( (resolve,reject) =>{

            firebase.database().ref('publicacoes/'+btoa(emailUsuario))
            .orderByKey()
            .once('value')
            .then((snapshot:any)=>{
                //console.log(snapshot.val())

                let publicacoes: Array<any> = [];

                snapshot.forEach( (childSnapshot: any) => {
                    let publicacao = childSnapshot.val()
                    publicacao.key = childSnapshot.key
                    
                    publicacoes.push(publicacao)
                });

                return publicacoes.reverse()

            })
            .then((publicacoes)=>{

                publicacoes.forEach((publicacao)=>{

                        //consulta a URL da imagem
                        firebase.storage().ref()
                        .child('imagens/'+publicacao.key).getDownloadURL()
                        .then((url:string)=>{
                            publicacao.url_imagem = url
                            // Consultar o nome do usuário

                            firebase.database().ref('usuario_detalhe/'+btoa(emailUsuario))
                            .once('value')
                            .then( (snapshot:any)=>{
                                //console.log(snapshot.val().usuario.nome_usuario)
                                publicacao.nome_usuario =  snapshot.val().usuario.nome_usuario
                         })
                    })
                })
                resolve(publicacoes)
            })
         })
    }
}

