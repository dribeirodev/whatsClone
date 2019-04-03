global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import { AppRegistry } from 'react-native';

// import YellowBox and Lodash para apagar mensagem warnning Firebase Database.
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
//---------------------------------


import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
