import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import firebase from 'firebase';

export default class MessageListItem extends Component{
    constructor(props){
        super(props);
        this.state = {imageLoaded: false, isMounted:true};
    }
    componentDidMount(){
        const $this = this;
        this.loadListener = ()=> {   

            if($this.msgItem){//if the component still exists
                $this.setState({imageLoaded: true});
            }
            $this.img.removeEventListener('load',$this.loadListener);
        }; 
        if(this.props.message.imageUrl){
                $this.img = new Image();
                $this.img.src = $this.props.message.imageUrl;
                $this.img.addEventListener('load',$this.loadListener);
            
        }
    }
    render(){
        const message = this.props.message;
        const currentUser = firebase.auth().currentUser;
        let content = null;
        let formattedTime = new Date(message.time).toLocaleString();
        const innerContent = <div>
            {message.text}
            {message.imageUrl && !this.state.imageLoaded ? <div className="with-margin"><CircularProgress color={message.sender === "farooq" ? "#fff":"#00BCD4"} size={20} ref={el => this.loader = el}/></div> : null}
            {message.imageUrl && this.state.imageLoaded ? <img className="with-margin" style={{width:"100%"}} src={message.imageUrl} /> : null}
        </div>;
        if(message.sender === currentUser.uid){
            content = <ListItem
                    disabled={true}
                    className="right-text with-margin"
                    style={{backgroundColor:"#00BCD4",color:"#fff",paddingRight:"64px"}}
                    secondaryText={formattedTime}
                    rightAvatar={<Avatar src={this.props.userAvatar}/>}>
                       {innerContent}
                    </ListItem> 
        }
        else{
            content = <ListItem
                    disabled={true}
                    style={{backgroundColor:"#E6E6E6",paddingLeft:"64px"}}
                    secondaryText={formattedTime}
                    leftAvatar={<Avatar src={this.props.userAvatar}/>}>
                        {innerContent}
                    </ListItem> 
        }
        return (
            <div ref={el=>this.msgItem=el}>

            {content}
            </div>
            
        );
    }
}