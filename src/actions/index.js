export const SIGN_IN_DATA = "SIGN_IN_DATA";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_CURRENT_CONV = "SET_CURRENT_CONV";

export function setCurrentConversation(key){
    return {
        type: SET_CURRENT_CONV,
        payload:key
    }
}
export function setConversations(conv){
    return {
        type: SET_CONVERSATIONS,
        payload: conv
    }
}
export function setChatCurrentUser(userData){
    localStorage.setItem('currentChatUser', JSON.stringify(userData));
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}
export function setSignInData(userData){
    return {
        type: SIGN_IN_DATA,
        payload: userData
    }
}
export function setProgress(visible){// visible:bool
    return {
        type: SET_PROGRESS,
        payload: {visible: visible}
    }
}
