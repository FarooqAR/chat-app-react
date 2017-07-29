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
    apiKey: "API_KEY",
    authDomain: "<YOUR_FIREBASE_APP>.firebaseapp.com",
    databaseURL: "https://<YOUR_FIREBASE_APP>.firebaseio.com",
    storageBucket: "<YOUR_FIREBASE_APP>.appspot.com",
    messagingSenderId: "MESSAGING_SENDER_ID"
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
