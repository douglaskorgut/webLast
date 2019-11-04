import * as firebase from 'firebase';
import  {Injectable} from '@angular/core';
import { Progresso } from './progresso.service';
import {DomSanitizer} from '@angular/platform-browser';
import { resolve } from 'url';
@Injectable()
export class Bd {

    public userIsOnDb: boolean;
    public counter: any;
    constructor(private progresso: Progresso,  public sanitizer: DomSanitizer ) {

    }

    public checkForSameId(id: any): Promise<any> {
        this.userIsOnDb = false;
        return firebase.database().ref('perfil_publicacoes/').once('value')
            .then(function(users) {
                users.forEach(user => {
                    user.forEach(pic => {
                        if ( pic.val().id == id ) {

                        } else {

                        }

                    });
                    // firebase.database().ref('perfil_publicacoes').child(user.key).once('value')
                    //     .then(function(res){
                    //         console.log(res.val())
                    //     })

                });
            });
    }

    public descadastrarFace(picRef: string, userRef: string, knownFaceName: any) {
      console.log('Descadastrar face');
        // firebase.database().ref('reiniciar_sistema').remove()
        firebase.database().ref('perfil_publicacoes/' + userRef).once('value')
            .then(function(resposta) {
                resposta.forEach(element => {
                  // tslint:disable-next-line:no-shadowed-variable
                    console.log(knownFaceName)
                    element.forEach(ids => {
                      if (ids.val() === knownFaceName ) {
                        console.log("delete")
                        firebase.database().ref('reiniciar_sistema/').push({'flag': knownFaceName});
                        firebase.database().ref('perfil_publicacoes/' + userRef).child(element.key).remove();
                        firebase.storage().ref().child('perfil_images/' + element.key).delete();
                      }
                    });
                    // firebase.database().ref('reiniciar_sistema/').push({'flag': faceId});
                    // // firebase.database().ref('perfil_publicacoes/' + userRef).child(element.key).remove();
                    //
                    // firebase.database().ref('perfil_publicacoes/' + userRef).child(element.key).remove();
                    // firebase.storage().ref().child('perfil_images/' + element.key).delete();
                    //
                    // count++;

                //
                });
            });
    }

    public deletarPerfilCaptura(picRef: string, userRef: string) {
        firebase.database().ref('perfil_publicacoes/' + userRef).child(picRef).remove();
        firebase.storage().ref().child('perfil_images/' + picRef).delete();
    }

    public deletarCaptura(picRef: string, userRef: string) {
        firebase.database().ref('publicacoes/' + userRef).child(picRef).remove();
        firebase.storage().ref().child('imagens/' + picRef).delete();

    }

    public salvarCaptura(picRef: string, userRef: string) {

        firebase.storage().ref().child('imagens/' + picRef).getDownloadURL().
            then( function(url) {
                console.log(url);
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                  const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();

            }).catch((error: Error) => console.log(error));
        }

    public publicarUsuarioLogado(userLogged: string): void {
        firebase.database().ref('last_user_logged').update({userLogged});
    }

    public publicar (publicacao: any): void {

    firebase.database().ref('publicacoes/' + btoa(publicacao.email))
    .push({ titulo: publicacao.titulo})
        .then( (resposta: any) => {
            const nomeImagem = resposta.key;
                firebase.storage().ref()
            .child('imagens/' + nomeImagem)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    // Acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                    //console.log('snapshot: ',snapshot)
                },
                (error) => {
                    this.progresso.status = 'erro';
                    //console.log(error)
                },
                () => {
                // console.log('uploadCompleto')
                    this.progresso.status = 'concluido';

                }
            );
        });

    }

    public publicarGrupoReconhecimento (publicacao: any): void {

        firebase.database().ref('grupo_reconhecimento/' + btoa(publicacao.email) + btoa(publicacao.titulo))
        .push({ titulo: publicacao.titulo})
            .then( (resposta: any) => {
                const nomeImagem = resposta.key;
                    firebase.storage().ref()
                .child('reconhecimento_thumb/' + nomeImagem)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso do upload
                    (snapshot: any) => {
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                        //console.log('snapshot: ',snapshot)
                    },
                    (error) => {
                        this.progresso.status = 'erro';
                        //console.log(error)
                    },
                    () => {
                    // console.log('uploadCompleto')
                        this.progresso.status = 'concluido';

                    }
                );
            });

        }

    public publicarBuffer (publicacao: any): void {

        firebase.database().ref('perfil_buffer/' + btoa(publicacao.email))
        .push({ titulo: publicacao.titulo, id: publicacao.id})
            .then( (resposta: any) => {
                const nomeImagem = resposta.key;
                    firebase.storage().ref()
                .child('perfil_buffer/' + nomeImagem)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso do upload
                    (snapshot: any) => {
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                        //console.log('snapshot: ',snapshot)
                    },
                    (error) => {
                        this.progresso.status = 'erro';
                        //console.log(error)
                    },
                    () => {
                    // console.log('uploadCompleto')
                        this.progresso.status = 'concluido';

                    }
                );
            });

        }

    public publicarPerfil (publicacao: any): void {

        firebase.database().ref('perfil_publicacoes/' + btoa(publicacao.email))
        .push({ titulo: publicacao.titulo, id: publicacao.id})
            .then( (resposta: any) => {
                const nomeImagem = resposta.key;
                    firebase.storage().ref()
                .child('perfil_images/' + nomeImagem)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        // Acompanhamento do progresso do upload
                    (snapshot: any) => {
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                        //console.log('snapshot: ',snapshot)
                    },
                    (error) => {
                        this.progresso.status = 'erro';
                        //console.log(error)
                    },
                    () => {
                    // console.log('uploadCompleto')
                        this.progresso.status = 'concluido';

                    }
                );
            });

        }

    public consultaPublicacoesVideo(emailUsuario: string): Promise<any> {
        return new Promise( (resolve, reject) => {

            firebase.database().ref('video_publicacoes/' + btoa(emailUsuario))
            .orderByKey()
            .once('value').then( (snapshot: any) => {
                const publicacoes: Array<any> = [];

                snapshot.forEach( (childSnapshot: any) => {
                    const publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;

                    publicacoes.push(publicacao);
                });

                return publicacoes.reverse();
            })
             .then((publicacoes) => {

                publicacoes.forEach((publicacao) => {


                    //consulta a URL da imagem
                    firebase.storage().ref()
                    .child('videos/' + publicacao.key).getDownloadURL()
                    .then((url: string) => {
                        const newUrl = this.sanitizer.bypassSecurityTrustResourceUrl( url );
                        publicacao.url_video =  newUrl;

                        // Consultar o nome do usuário

                        firebase.database().ref('usuario_detalhe/' + btoa(emailUsuario))
                        .once('value')
                        .then( (snapshot: any) => {
                            //console.log(snapshot.val().usuario.nome_usuario)
                            publicacao.nome_usuario =  snapshot.val().usuario.nome_usuario;
                     });
                  });
                });
                resolve(publicacoes);
              });
        });
    }

    public consultaPerfilPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise ( (resolve, reject) => {

            firebase.database().ref('perfil_publicacoes/' + btoa(emailUsuario))
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
                //console.log(snapshot.val())

                const publicacoes: Array<any> = [];

                snapshot.forEach( (childSnapshot: any) => {
                    const publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;

                    publicacoes.push(publicacao);
                });

                return publicacoes.reverse();

            })
            .then((publicacoes) => {

                publicacoes.forEach((publicacao) => {

                        //consulta a URL da imagem
                        firebase.storage().ref()
                        .child('perfil_images/' + publicacao.key).getDownloadURL()
                        .then((url: string) => {
                            publicacao.url_imagem = url;
                            // Consultar o nome do usuário

                            firebase.database().ref('usuario_detalhe/' + btoa(emailUsuario))
                            .once('value')
                            .then( (snapshot: any) => {
                                //console.log(snapshot.val().usuario.nome_usuario)
                                publicacao.nome_usuario =  snapshot.val().usuario.nome_usuario;
                         });
                    });
                });
                resolve(publicacoes);
            });
         });

    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise ( (resolve, reject) => {

            firebase.database().ref('publicacoes/' + btoa(emailUsuario))
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
                //console.log(snapshot.val())

                const publicacoes: Array<any> = [];

                snapshot.forEach( (childSnapshot: any) => {
                    const publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;

                    publicacoes.push(publicacao);
                });

                return publicacoes.reverse();

            })
            .then((publicacoes) => {

                publicacoes.forEach((publicacao) => {

                        //consulta a URL da imagem
                        firebase.storage().ref()
                        .child('imagens/' + publicacao.key).getDownloadURL()
                        .then((url: string) => {
                            publicacao.url_imagem = url;
                            // Consultar o nome do usuário

                            firebase.database().ref('usuario_detalhe/' + btoa(emailUsuario))
                            .once('value')
                            .then( (snapshot: any) => {
                                //console.log(snapshot.val().usuario.nome_usuario)
                                publicacao.nome_usuario =  snapshot.val().usuario.nome_usuario;
                         });
                    });
                });
                resolve(publicacoes);
            });
         });

        }
}

