import {SET_CONVERSATIONS} from '../actions/index';

export default function(state = null, action){
    switch(action.type){
        case SET_CONVERSATIONS:
            return action.payload;
    }
    return state;
}