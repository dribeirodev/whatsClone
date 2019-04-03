import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, FlatList, Text, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppAction';

class Conversa extends Component {

    componentWillMount() {
        console.log('componentWillMount', this.props.contatoEmail)
        this.props.conversaUsuarioFetch(this.props.contatoEmail)
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextprops) {
        console.log('componentWillReceiveProps', nextprops.contatoEmail)
        if (this.props.contatoEmail != nextprops.contatoEmail) {
            this.props.conversaUsuarioFetch(nextprops.contatoEmail);
        }
        this.criaFonteDeDados(nextprops.conversa);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount', this.props.contatoEmail);
    }

    criaFonteDeDados(conversa) {
        this.fonteDeDados = conversa.reverse();
    }

    _enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderItem({ item, index }) {
        console.log(item);
        if (item.tipo === 'e') {
            return (
                <View style={{
                    alignItems: 'flex-end', marginTop: 5,
                    marginBottom: 5, marginLeft: 40, marginRight: 10
                }}>
                    <Text style={{
                        fontSize: 18, color: '#000', padding: 10,
                        backgroundColor: '#dbf5b4', elevation: 1,
                        borderRadius: 15
                    }}>
                        {item.mensagem}
                    </Text>
                </View>
            )
        }
        return (
            <View style={{
                alignItems: 'flex-start', marginTop: 5,
                marginBottom: 5, marginRight: 40, marginLeft: 10
            }}>
                <Text style={{
                    fontSize: 18, color: '#000', padding: 10,
                    backgroundColor: '#f7f7f7', elevation: 1,
                    borderRadius: 15
                }}>{item.mensagem}
                </Text>
            </View>
        )
    }

    render() {
        console.log('render', this.props.contatoEmail)
        return (
            <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.fonteDeDados}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            inverted>
                        </FlatList>
                    </View>
                    <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#fff', padding: 10, borderTopWidth: 0.6, borderColor: '#8f8f8f' }}>
                        <TextInput
                            style={{
                                flex: 4, marginHorizontal: 10, backgroundColor: '#fff',
                                paddingLeft: 25,
                                fontSize: 18, borderColor: '#8f8f8f', borderWidth: 1, borderRadius: 20
                            }}
                            value={this.props.mensagem}
                            onChangeText={texto => this.props.modificaMensagem(texto)}
                        />
                        <TouchableHighlight style={{ alignItems: 'center' }}
                            onPress={this._enviaMensagem.bind(this)}
                            underlayColor='#fff'>
                            <Icon name="send" size={35} color="#a21e78" />
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid };
    });

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem,
    });
}

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuarioFetch })(Conversa);