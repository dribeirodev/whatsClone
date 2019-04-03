import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash'

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATOS_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO,
} from "./types";

export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {

    return dispatch => {

        let emailb64 = b64.encode(email);
        firebase.database().ref(`/contatos/${emailb64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    //email usuário autenticado
                    const dadosUsuario = _.first(_.values(snapshot.val()));

                    //email logado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    firebase.database().ref(`/usuario_contato/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() => adicionaContatoSucesso(dispatch))
                        .catch(erro => adicionaContatoErro(erro.message, dispatch));

                } else {
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO,
                        payload: 'E-mail não cadastrado no aplicativo!'
                    })
                }
            })
    }
}

const adicionaContatoErro = (erro, dispatch) => {
    dispatch({
        type: ADICIONA_CONTATO_ERRO,
        payload: erro
    })
}

const adicionaContatoSucesso = (dispatch) => {
    dispatch({
        type: ADICIONA_CONTATO_SUCESSO,
        payload: true
    })
}

export const habilitaInclusaoContato = () => ({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false
})

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contato/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATOS_USUARIO, payload: snapshot.val() })
            });
    }
}

export const modificaMensagem = texto => {
    return {
        type: MODIFICA_MENSAGEM,
        payload: texto
    }
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {
    //dados usuario autenticado
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {
        //conversao b64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }))
            }).then(() => {
                //armazenamento dos cabeçarios
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            }).then(() => {
                //recuperar nome usuario autenticado
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        const dadosUsuario = _.first(_.values(snapshot.val()));
                        //armazenamento cabeçario conversa do contato
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail })
                    })

            })
    }
}

export const conversaUsuarioFetch = (contatoEmail) => {
    //dados usuario autenticado
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {
        //conversao b64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot =>{
                dispatch({type: LISTA_CONVERSA_USUARIO, payload: snapshot.val()})
            })
    }
}

export const conversasUsuarioFetch = () => {
    //dados usuario autenticado
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {
        //conversao b64
        const usuarioEmailB64 = b64.encode(usuarioEmail);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot =>{
                dispatch({type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val()})
            })
    }
}