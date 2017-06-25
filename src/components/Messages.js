import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';
import MessageListItem from './MessageListItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProgress} from '../actions/index';
import firebase from 'firebase';

class Messages extends Component{
    constructor(props){
        super(props);
        this.state= {messages:null,updatedForFirstTime:false};
    }
    componentDidUpdate(){
        const messagesListRect  = this.messagesList.getBoundingClientRect();
        this.messagesList.scrollTop = this.messagesList.scrollHeight;
        if(!this.state.updatedForFirstTime){
            this.setState({updatedForFirstTime:true});
        }
    }
    componentWillUnmount(){
        if(this.props.currentConvKey)
        firebase.database().ref('messages').child(this.props.currentConvKey).off();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentConvKey !== this.props.currentConvKey){
            this.setState({messages:null});
        }
        if(nextProps.currentConvKey && (!this.state.updatedForFirstTime || nextProps.currentConvKey !== this.props.currentConvKey)){
                
            const db = firebase.database();
            const $this = this;
            const messagesRef = db.ref('messages').child(nextProps.currentConvKey);
            const usersRef = db.ref('users');
            const conversationRef = db.ref('conversations').child(nextProps.currentConvKey);
            messagesRef.off();
            $this.props.setProgress(true);
            conversationRef.once('value').then((snapshot)=>{
                let users = Object.keys(snapshot.val().users);
                let photo_0 = null,
                    photo_1 = null;
                usersRef.child(users[0]+"/photoURL").once('value').then(s=>{
                    photo_0 = s.val();
                    
                    usersRef.child(users[1]+"/photoURL").once('value').then(s=>{
                        photo_1 = s.val();

                        messagesRef.on('value',function(snapshot){
                            let messages = [];
                            snapshot.forEach(messageSnapshot => {
                                let message = messageSnapshot.val();
                                
                                const msgItem = (
                                    <MessageListItem
                                    key={messageSnapshot.key} 
                                    message={message}
                                    userAvatar={message.sender === users[0] ? photo_0 : photo_1}/>
                                );
                                
                                messages.push(msgItem);
                            })
                            
                            $this.props.setProgress(false);
                            $this.setState({messages: messages});
                        },function(e){
                            $this.props.setProgress(false);
                            
                        })
                    })
                });
            });
            
        }
    }
    render(){
        const $this = this;
        const cChatUser = this.props.currentChatUser;
        const currentUser  = firebase.auth().currentUser;
        return (
            <div ref={el=>this.messagesList = el} style={{maxHeight:$this.props.height+"px",  overflowY:"auto"}}>
                <List>
                    {this.props.currentChatUser === null ? <h2 className="with-margin centered-text">{"Welcome " + (currentUser && currentUser.displayName) + "!"} Select a Person to Chat!</h2> : this.state.messages}
                </List>                
                
            </div>
        );
    }

}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setProgress},dispatch);
}
function mapStateToProps(state){
    return {currentChatUser: state.currentChatUser, currentConvKey: state.currentConversation};
}
export default connect(mapStateToProps,mapDispatchToProps)(Messages);