import React, { Component } from 'react';
import { View, Text, Button, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';
import {NAME_APP} from '../values/Strings';

class formLogin extends Component {

    _autenticarUsuario() {
        const { email, senha } = this.props;

        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnAcessar() {
        if(this.props.loading){
            return(
                <ActivityIndicator size="large"/>
            )
        }
        return (
            <Button title="Acessar"
                color='#6f0c4f'
                onPress={() => this._autenticarUsuario()} />
        );
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 2, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25 }}>{NAME_APP}</Text>
                    </View>
                    <View style={{ flex: 2, marginVertical: 5, marginHorizontal: 8 }}>
                        <TextField
                            value={this.props.email}
                            label='E-mail'
                            tintColor={'#6f0c4f'}
                            labelFontSize={18}
                            labelHeight={45}
                            fontSize={18}
                            error={this.props.erroEmail}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextField
                            value={this.props.senha}
                            label='Senha'
                            secureTextEntry
                            tintColor={'#6f0c4f'}
                            labelFontSize={18}
                            labelHeight={45}
                            fontSize={18}
                            error={this.props.erroSenha}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <TouchableHighlight onPress={() => Actions.formCadastro()}>
                            <Text style={{ fontSize: 14, textAlign: "center", marginTop: 15 }}>Ainda não tem cadastro?
                    <Text style={{ color: '#6f0c4f', fontWeight: "700" }}> Cadastre-se </Text>
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroEmail: state.AutenticacaoReducer.erroEmail,
            erroSenha: state.AutenticacaoReducer.erroSenha,
            loading: state.AutenticacaoReducer.loading,
        }
    );
}

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);