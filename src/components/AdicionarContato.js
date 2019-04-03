import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppAction'

class AdicionarContato extends Component {

    renderAdiconaContato() {
        if (!this.props.adicionar_contato_email_sucesso) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextField
                            value={this.props.adicionar_contato_email}
                            label='E-mail'
                            tintColor={'#6f0c4f'}
                            labelFontSize={18}
                            labelHeight={45}
                            fontSize={18}
                            error={this.props.adicionar_contato_email_erro}
                            onChangeText={texto => this.props.modificaAdicionaContatoEmail(texto)}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Button title="Adicionar" color="#6f0c4f"
                            onPress={() => this.props.adicionaContato(this.props.adicionar_contato_email)} />
                    </View>

                </View>
            )
        } else {
            return (
            <View>
                <Text style={{ fontSize: 20 }}>
                    Cadastro realizado com sucesso!
                </Text>
            </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                {this.renderAdiconaContato()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    adicionar_contato_email: state.AppReducer.adicionar_contato_email,
    adicionar_contato_email_erro: state.AppReducer.adicionar_contato_email_erro,
    adicionar_contato_email_sucesso: state.AppReducer.adicionar_contato_email_sucesso,
})

export default connect(mapStateToProps, { modificaAdicionaContatoEmail, adicionaContato })(AdicionarContato);