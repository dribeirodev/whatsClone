import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#6f0c4f' }} titleStyle={{ color: '#fff' }} >
        <Stack key='root'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='boasVindas' component={BoasVindas} hideNavBar />
            <Scene key='principal' component={Principal} hideNavBar />
            <Scene key='adicionarContato'  component={AdicionarContato} title="Adicionar Contato" />
            <Scene key='conversa' component={Conversa} title="Conversa" />
        </Stack>
    </Router>
);