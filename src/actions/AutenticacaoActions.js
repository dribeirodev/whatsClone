import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import {
    MODIFICA_EMAIL, MODIFICA_SENHA, MODIFICA_NOME,
    CADASTRO_USUARIO_ERRO, CADASTRO_USUARIO_SUCESSO,
    LOGIN_ERRO, LOGIN_SUCESSO, LOADING_EM_ANDAMENTO
} from './types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastrarUsuario = ({ nome, email, senha }) => {
    if (nome, email, senha) {
        return dispatch => {

            dispatch({
                type: LOADING_EM_ANDAMENTO,
            })


            firebase.auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(user => {
                    let emailb64 = b64.encode(email);

                    firebase.database().ref(`/contatos/${emailb64}`)
                        .push({ nome })
                        .then(value => cadastrarUsuarioSucesso(dispatch));

                })
                .catch(erro => cadastrarUsuarioErro(erro, dispatch));
        }
    } else {
        let erroNome = '', erroEmail = '', erroSenha = '';
        if (!nome) {
            erroNome = "Preencha campo Nome!";
        }
        if (!email) {
            erroEmail = "Preencha campo Email!";
        }
        if (!senha) {
            erroSenha = "Preencha campo Senha!";
        }

        return {
            type: CADASTRO_USUARIO_ERRO,
            payload: {
                erroNome,
                erroEmail,
                erroSenha,
            }
        }
    }
}

const cadastrarUsuarioSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_SUCESSO });
    Actions.boasVindas();
}

const cadastrarUsuarioErro = (erro, dispatch) => {

    let erroEmail = '', erroSenha = '', erroInesperado = '';

    if (erro.code == "auth/email-already-in-use") {
        erroEmail = 'Email já esta em uso, fazer cadastro com outro email!';
    }
    if (erro.code == "auth/weak-password") {
        erroSenha = 'A senha precisa ter no mínimo de 6 caracteres!';
    }
    if (erro.code == "auth/invalid-email") {
        erroEmail = 'Email inválido, por favor rever seu email!';
    }

    if (!erroEmail && !erroSenha) {
        erroInesperado = 'Erro ao efetuar cadastro!';
    }

    dispatch({
        type: CADASTRO_USUARIO_ERRO,
        payload: {
            erroEmail,
            erroSenha,
            erroInesperado,
        }
    });
}

export const autenticarUsuario = ({ email, senha }) => {
    if (email, senha) {
        return dispatch => {

            dispatch({
                type: LOADING_EM_ANDAMENTO,
            })

            firebase.auth().signInWithEmailAndPassword(email, senha)
                .then(value => loginSucesso(dispatch))
                .catch(erro => loginErro(erro, dispatch));
        }
    } else {
        let erroEmail = '', erroSenha = '';
        if (!email) {
            erroEmail = "Preencha campo Email!";
        }
        if (!senha) {
            erroSenha = "Preencha campo Senha!";
        }

        return {
            type: LOGIN_ERRO,
            payload: {
                erroEmail,
                erroSenha,
            }
        }
    }
}

const loginSucesso = (dispatch) => {
    dispatch({ type: LOGIN_SUCESSO });
    Actions.principal();
}

const loginErro = (erro, dispatch) => {
    //console.log(erro);
    let erroEmail = '', erroSenha = '', erroInesperado = '';

    if (erro.code == "auth/invalid-email") {
        erroEmail = 'Email inválido.';
    }
    if (erro.code == "auth/wrong-password") {
        erroSenha = 'Senha inválida.';
    }
    if (erro.code == "auth/user-not-found") {
        erroEmail = 'Email não encontrado.';
    }

    if (!erroEmail && !erroSenha) {
        erroInesperado = 'Erro ao efetuar cadastro!';
    }

    dispatch({
        type: LOGIN_ERRO,
        payload: {
            erroEmail,
            erroSenha,
        }
    });
}