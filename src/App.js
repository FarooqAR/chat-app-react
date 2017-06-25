import React, {Component} from 'react';
import Nav from './components/Nav';
import LinearProgress from 'material-ui/LinearProgress';
import firebase from 'firebase';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProgress, setSignInData} from './actions/index';

 class App extends Component {
  componentDidMount(){
    const $this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $this.props.setProgress(true);
        const {uid} = user;
        const {displayName, photoURL} = user.providerData[0];
        
        const db = firebase.database();
        const userRef = db.ref('users').child(uid);
        userRef.once('value').then((snapshot)=>{
            // update database
            userRef.set({
              displayName: displayName,
              photoURL: photoURL,
              online: true
            }).then(()=>{
              $this.props.setProgress(false);
              redirectToChat();//the user is now redirected to ChatScreen
            }).catch((err)=>{
              console.log(err.message);
            });

        });
        function redirectToChat(){
          $this.props.setSignInData({displayName, photoURL, uid});
          browserHistory.push('/chat');
        }
        
      } else {//if user logged out
        browserHistory.push('/');
        $this.props.setSignInData(null);
      }
    });
  }
  render() {
    return (
        <div>
          <LinearProgress mode="indeterminate" style={{opacity: (this.props.isProgressVisible ? 1 : 0)}}/>
          <Nav />
          {this.props.children}
        </div>
      
    );
  }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setSignInData,setProgress},dispatch);
}
function mapStateToProps(state){
  return {isProgressVisible: state.progressStatus.visible};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);