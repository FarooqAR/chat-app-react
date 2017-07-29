import {SET_CURRENT_USER} from '../actions/index';

export default function(state = null, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return action.payload;
    }
    let currentChatUser = JSON.parse(localStorage.getItem('currentChatUser'));
    if(currentChatUser){
        return currentChatUser;
    }
    return state;
}