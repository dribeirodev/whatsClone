import React from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }} source={require('../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 15 }}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>Seja Bem Vindo</Text>
                <Text>Image logo</Text>
            </View>
            <Button title="Fazer Login" onPress={() => Actions.formLogin() }></Button>
            <View style={{ flex: 1 }}>
            </View>
        </View>
    </ImageBackground>
);