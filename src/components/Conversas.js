import React, { Component } from 'react';
import {
    View, Text,
    FlatList, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { conversasUsuarioFetch } from '../actions/AppAction';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUsuarioFetch()
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextprops) {
        this.criaFonteDeDados(nextprops.conversas);
    }

    criaFonteDeDados(conversas) {
        this.fonteDeDados = conversas;
    }

    renderItem({ item, index }) {
        return (
            <TouchableHighlight
                onPress={() => Actions.conversa({ title: item.nome, contatoNome: item.nome, contatoEmail: item.email })}
            >
                <View style={{ flex: 1, padding: 14, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 20 }}>{item.nome}</Text>
                    <Text style={{ fontSize: 14 }}>{item.email}</Text>
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
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid }
    })
    return { conversas };
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);