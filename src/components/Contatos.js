import React, { Component } from 'react';
import {
    View, Text,
    FlatList, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuarioFetch } from '../actions/AppAction';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUsuarioFetch()
        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextprops) {
        this.criaFonteDeDados(nextprops.contatos);
    }

    criaFonteDeDados(contatos) {
        this.fonteDeDados = contatos;
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight
                onPress={() => Actions.conversa({ title: item.nome, contatoNome: item.nome, contatoEmail: item.email })}
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 25 }}>{item.nome}</Text>
                    <Text style={{ fontSize: 18 }}>{item.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <FlatList
                data={this.fonteDeDados}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}>
            </FlatList>
        )
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { contatos };
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);