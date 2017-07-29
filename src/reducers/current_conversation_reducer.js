import {SET_CURRENT_CONV} from '../actions/index';

export default function(state=null,action){
    switch(action.type){
        case SET_CURRENT_CONV:
            return action.payload;
    }
    return state;
}