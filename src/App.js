import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from '@firebase/app';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

  componentDidMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBOkVmQRdrkaAPmTD_yxyd81v7fM6XfmMo",
      authDomain: "whatz-7b06e.firebaseapp.com",
      databaseURL: "https://whatz-7b06e.firebaseio.com",
      projectId: "whatz-7b06e",
      storageBucket: "whatz-7b06e.appspot.com",
      messagingSenderId: "863444003453"
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

export default App;