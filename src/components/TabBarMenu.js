import React from 'react';
import { View, Text, StatusBar, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { NAME_APP } from '../values/Strings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppAction'
import firebase from 'firebase';

const TabBarMenu = props => (
    <View backgroundColor='#a21e78' style={{ elevation: 4, marginBottom: 6 }}>
        <StatusBar backgroundColor='#6f0c4f' />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ color: '#fff', marginLeft: 20, fontSize: 20 }}>{NAME_APP}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight
                        onPress={() => { Actions.adicionarContato(); props.habilitaInclusaoContato() }}
                        underlayColor='#6f0c4f'>
                        <Icon name="person-add" size={30} color="#fff" />
                    </TouchableHighlight>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight
                        onPress={() => { firebase.auth().signOut().then(() => Actions.formLogin()) }}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <TabBar {...props} style={{ backgroundColor: '#a21e78', elevation: 0 }} />
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);