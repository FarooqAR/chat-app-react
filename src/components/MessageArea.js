import React, { Component } from 'react';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCurrentConversation,setProgress} from '../actions/index';

class MessageArea extends Component{
    constructor(props){
        super(props);
        this.state = {msgText: "", imgUrl:null};
        this.sendMessage = this.sendMessage.bind(this);
    }
    onMessageTextChange(e){
        this.setState({msgText: e.target.value});
    }
    sendMessage(message,conversationKey){
        const db = firebase.database();
        const messagesRef = db.ref('messages');
        const $this = this;
        const msgPushKey = messagesRef.child($this.props.currentConvKey).push().key;
        $this.props.setProgress(true);
        messagesRef.child($this.props.currentConvKey).child(msgPushKey).set(message).then(function(){
            $this.setState({msgText: ""});
            $this.props.setProgress(false);
        }).catch(function(e){
            console.log(e.message);
            $this.props.setProgress(false);
        })
    }
    componentWillReceiveProps(nextProps){
        let cChatUser = nextProps.currentChatUser;
        let convKey = null;
        if(cChatUser){
            for(let key in nextProps.conversations){
                if(nextProps.conversations[key]['users'].hasOwnProperty(cChatUser.uid)){
                    convKey = key;
                    break;
                }
            }
            if(nextProps.currentConvKey !== convKey){
                nextProps.setCurrentConversation(convKey);
            }
            
        }
    }
    onMessageSend = (e) =>{ 
        e.preventDefault();
        if(this.props.currentChatUser && this.state.msgText.length > 0 || this.state.imgUrl){
            const $this = this;
            const currentUser = firebase.auth().currentUser;
            const db = firebase.database();
            const conversationsRef = db.ref('conversations');
            let conv_key = $this.props.currentConvKey;
            let conv = $this.props.conversations;//currently authenticated user conversations(they dont have actual messages, just keys and users associated to them)
            let message = {
                sender:currentUser.uid, 
                time:firebase.database.ServerValue.TIMESTAMP
            };
            if($this.state.msgText){
                message.text = $this.state.msgText;
            }
            else if($this.state.imgUrl){
                message.imageUrl = $this.state.imgUrl;
            }
            
            if(conv_key && conv.hasOwnProperty(conv_key)){// if conversation key exists
                if(conv[conv_key]['users'].hasOwnProperty(currentUser.uid)){
                    $this.sendMessage(message,conv_key);
                }
            }
            else{
                let convPushKey = conversationsRef.push().key; //make a unique conservation key
                let conversation = {};
                conversation[currentUser.uid] = true;
                conversation[$this.props.currentChatUser.uid] = true;
                conversationsRef.child(convPushKey).child('users').set(conversation).then(()=>{
                    $this.sendMessage(message, convPushKey);
                    
                }).catch((e)=>{
                    console.log(e.message);
                })
            }
         
        }
    }
    render(){
        
        return (
            <form onSubmit={this.onMessageSend}>
            <div id="message-area" style={{backgroundColor:"#fff", opacity:this.props.currentChatUser === null ? 0 : 1}}>

                    <div style={{position: 'relative'}}>
                        <TextField 
                            style={{width:"100%", paddingRight: 48}}
                            hintText="Type a message ..."
                            onChange={(e)=>this.onMessageTextChange(e)}
                            value={this.state.msgText}/>
                            
                        <IconButton
                            type="submit"
                            iconClassName="fa fa-paper-plane"
                            style={{position: 'absolute', right: 0, top: -5}}/>
                            
                    </div>
                
            </div>
            </form>
        );
    }
}
function mapStateToProps(state){
    return {currentChatUser: state.currentChatUser, conversations: state.conversations, currentConvKey:state.currentConversation};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setCurrentConversation, setProgress},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(MessageArea);