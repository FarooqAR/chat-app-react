import {SET_PROGRESS} from '../actions/index';

export default function (state = {visible: false}, action){
    switch(action.type){
        case SET_PROGRESS:
            return action.payload;
    }
    return state;
}