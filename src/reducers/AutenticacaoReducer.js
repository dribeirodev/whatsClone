import {
    MODIFICA_EMAIL, MODIFICA_SENHA, MODIFICA_NOME, CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_SUCESSO, LOGIN_ERRO, LOGIN_SUCESSO, LOADING_EM_ANDAMENTO
} from "../actions/types";

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroNome: '',
    erroEmail: '',
    erroSenha: '',
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_EMAIL: return { ...state, email: action.payload }
        case MODIFICA_SENHA: return { ...state, senha: action.payload }
        case MODIFICA_NOME: return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO:
            return {
                ...state,
                erroNome: action.payload.erroNome,
                erroEmail: action.payload.erroEmail,
                erroSenha: action.payload.erroSenha,
                loading: false
            }
        case CADASTRO_USUARIO_SUCESSO: return { ...state, nome: '', senha: '', loading: false }
        case LOGIN_ERRO:
            return {
                ...state,
                erroEmail: action.payload.erroEmail,
                erroSenha: action.payload.erroSenha,
                loading: false
            }
        case LOGIN_SUCESSO: return { ...state, ...INITIAL_STATE }
        case LOADING_EM_ANDAMENTO: return { ...state, loading: true }
        default:
            return state;
    }
}