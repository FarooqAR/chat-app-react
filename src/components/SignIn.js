import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setSignInData} from '../actions/index';

class SignIn extends Component{
    
    signInFb(){
        const $this = this;
        
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    signInGithub(){
        const $this = this;

        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    render(){
        return (
            <div className="centered-text with-margin">
                    <RaisedButton
                        label="Sign In using Facebook"
                        backgroundColor="#3C5A99"
                        labelColor="#fff"
                        style={{marginRight: 10}}
                        onClick={()=>this.signInFb()}
                        />
                    <RaisedButton
                        label="Sign In using Github"
                        labelColor="#000"
                        onClick={()=>this.signInGithub()}
                        />
                
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setSignInData},dispatch);
}

export default connect(null, mapDispatchToProps)(SignIn);