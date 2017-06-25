import {SIGN_IN_DATA} from '../actions/index';

export default function(state = null, action){
    switch(action.type){
        case SIGN_IN_DATA:
            return action.payload;
    }
    return state;
}