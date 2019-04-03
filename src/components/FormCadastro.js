import React, { Component } from 'react';
import { View, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import {
    modificaEmail, modificaSenha,
    modificaNome, cadastrarUsuario
} from '../actions/AutenticacaoActions';

class formCadastro extends Component {

    _cadastrarUsuario() {
        const { nome, email, senha } = this.props;

        this.props.cadastrarUsuario({
            nome, email, senha
        });
    }

    renderBtnCadastrar() {
        if (this.props.loading) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#6f0c4f" onPress={() => this._cadastrarUsuario()} />
        );
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center', marginVertical: 10, marginHorizontal: 20 }}>
                        <TextField
                            value={this.props.nome}
                            label="Nome"
                            onChangeText={texto => this.props.modificaNome(texto)}
                            tintColor={'#6f0c4f'}
                            labelFontSize={16}
                            labelHeight={45}
                            fontSize={16}
                            error={this.props.erroNome} />
                        <TextField
                            value={this.props.email}
                            label="E-mail"
                            onChangeText={texto => this.props.modificaEmail(texto)}
                            tintColor={'#6f0c4f'}
                            labelFontSize={16}
                            labelHeight={45}
                            fontSize={16}
                            error={this.props.erroEmail} />
                        <TextField
                            value={this.props.senha}
                            label="Senha"
                            onChangeText={texto => this.props.modificaSenha(texto)}
                            secureTextEntry
                            tintColor={'#6f0c4f'}
                            labelFontSize={16}
                            labelHeight={45}
                            fontSize={16}
                            error={this.props.erroSenha} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBtnCadastrar()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            nome: state.AutenticacaoReducer.nome,
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroNome: state.AutenticacaoReducer.erroNome,
            erroEmail: state.AutenticacaoReducer.erroEmail,
            erroSenha: state.AutenticacaoReducer.erroSenha,
            loading: state.AutenticacaoReducer.loading,
        }
    );
}

export default connect(mapStateToProps, {
    modificaEmail, modificaSenha,
    modificaNome, cadastrarUsuario
})(formCadastro);