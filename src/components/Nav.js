import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import firebase from 'firebase'

class Nav extends Component{
    constructor(props){
        super(props);
    }

    signOut(){
        firebase.auth().signOut();
    }
    render(){
        const Logged =<IconMenu

            iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Sign out" onTouchTap={this.signOut}/>
        </IconMenu>;
 
        return (
                <div>

                <AppBar title="One to One Chat"
                showMenuIconButton={false}
                iconElementRight={this.props.signInData ? Logged : null} 
                />
                </div>
            
        );
    }
}
function mapStateToProps(state){
    return {signInData: state.signInData}
}

export default connect(mapStateToProps)(Nav);