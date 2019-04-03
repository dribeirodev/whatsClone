import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO
} from "../actions/types";

const INITIAL_STATE = {
    adicionar_contato_email: '',
    adicionar_contato_email_erro: '',
    adicionar_contato_email_sucesso: false,
    mensagem: ''
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adicionar_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, adicionar_contato_email_erro: action.payload }
        case ADICIONA_CONTATO_SUCESSO:
            return {
                ...state,
                adicionar_contato_email_sucesso: action.payload,
                adicionar_contato_email: '',
                adicionar_contato_email_erro: ''
            }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case ENVIA_MENSAGEM_SUCESSO:
            return { ...state, mensagem: '' }
        default:
            return state;
    }
}