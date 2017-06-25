import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import firebase from 'firebase';
import ChatUserList from './ChatUserList';
import MessageArea from './MessageArea';
import Messages from './Messages';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setConversations} from '../actions/index';

class ChatScreen extends Component{
    constructor(props){
        super(props);
        this.state = {messageListHeight:0};
    }
    componentWillMount(){
        const user = firebase.auth().currentUser;
        if(user == null){
            browserHistory.push('/');
        }    
        firebase.database().ref('conversations').off();
    }
    componentDidMount(){
        const $this = this;
        var messageArea = document.getElementById('message-area');
        var messageAreaRect= messageArea.getBoundingClientRect();
        var chatScreenOffset = this.chatScreen.getBoundingClientRect();
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState({messageListHeight:(vh-messageAreaRect.height-chatScreenOffset.top*2)});
        const conversationsRef = firebase.database().ref('conversations');
        conversationsRef.on('value', function(snapshot){
            let userConversations = {};
            snapshot.forEach(conversation => {
                
                if(conversation.child('users').hasChild(firebase.auth().currentUser.uid)){
                    
                    userConversations[conversation.key] = conversation.val();
                }
            });
            $this.props.setConversations(userConversations);

        });
    }
    render(){
        const currentUser = firebase.auth().currentUser;
        
        return (
            <div ref={el=>this.chatScreen = el} className="with-margin">
                <div>
                    <div className="row">
                        <div className="col md-4 users-list">
                            <ChatUserList />
                        </div>
                        <div className="col md-8 chat-area">
                            <Messages height={this.state.messageListHeight}/>
                            <MessageArea />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setConversations}, dispatch);
}
export default connect(null, mapDispatchToProps)(ChatScreen);