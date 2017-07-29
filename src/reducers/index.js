import { combineReducers } from 'redux';
import signInDataReducer from './signin_data_reducer';
import setProgressReducer from './set_progress_reducer';
import currentChatUserReducer from './current_chat_user_reducer';
import conversationsReducer from './conversations_reducer';
import currentConversationReducer from './current_conversation_reducer';

const rootReducer = combineReducers({
    signInData: signInDataReducer,
    progressStatus : setProgressReducer  ,
    currentChatUser: currentChatUserReducer,
    conversations: conversationsReducer ,
    currentConversation: currentConversationReducer
}); 
export default rootReducer;