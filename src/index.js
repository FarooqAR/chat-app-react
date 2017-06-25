import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import SignIn from './components/SignIn';
import ChatScreen from './components/ChatScreen';
import firebase from 'firebase';
import { Router, Route,IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
// Needed for onTouchTap
injectTapEventPlugin();
// Initialize Firebase
const config = {
    apiKey: "AIzaSyC1iZmDY5vFDz62NU2zixdlG_DGQzpmqPg",
    authDomain: "one-to-one-chat-83ed1.firebaseapp.com",
    databaseURL: "https://one-to-one-chat-83ed1.firebaseio.com",
    storageBucket: "one-to-one-chat-83ed1.appspot.com",
    messagingSenderId: "689664286911"
};
firebase.initializeApp(config);
window.onload = function(){
render(
  <MuiThemeProvider>
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SignIn}/>
        <Route path="/chat" component={ChatScreen}/>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
}
