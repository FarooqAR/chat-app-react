import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setChatCurrentUser} from '../actions/index';

class ChatUserList extends Component{
    constructor(props){
        super(props);
        this.state={offsetTop:0, users:null}
        this.onUserItemClick = this.onUserItemClick.bind(this);
    }
    componentDidMount(){
        const $this = this;
        const offset = this.listEl.getBoundingClientRect();
        this.setState({offsetTop:offset.top});
        const db = firebase.database();
        this.usersRef = db.ref('users');
        this.usersRef.on('value', function(snapshot){
            $this.setState({users:snapshot.val()});
        });
    }
    componentWillUnmount(){
        this.usersRef.off();
    }
    onUserItemClick(user){
        const $this = this;
        return function(){
            $this.props.setChatCurrentUser(user);
        }
    }
    render(){
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const $this = this;
        const currentUser = firebase.auth().currentUser;
        const currentChatUser = this.props.currentChatUser;
        
        return (
            <div ref={el => this.listEl = el}>

            <List  style={{overflowX:"hidden",overflowY:"scroll", maxHeight:(h-$this.state.offsetTop*2)+"px"}}>
                {w < 768 ? null : <Subheader>Current Chat</Subheader>}
                {currentChatUser ? <ListItem 
                primaryText={currentChatUser.displayName}
                disabled={true}
                style={{backgroundColor:"#E6E6E6"}}
                leftAvatar={<Avatar src={currentChatUser.photoURL}/>}
                />:null}
                <Divider />
                <List>
                    {w < 768 ? null : <Subheader>All</Subheader>}
                    {this.state.users && Object.keys(this.state.users).map((key)=>{
                        let user = this.state.users[key];
                        user.uid = key;
                        if(key === currentUser.uid){
                            return null;
                        }
                        return (
                            <ListItem
                            key={key}
                            onTouchTap={this.onUserItemClick(user)}
                            primaryText={user.displayName || user.username}
                            leftAvatar={<Avatar src={user.photoURL} />} />
                        );
                    })}
                   
                </List>
            </List>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setChatCurrentUser}, dispatch);
}
function mapStateToProps(state){
    return {currentChatUser: state.currentChatUser};
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatUserList);