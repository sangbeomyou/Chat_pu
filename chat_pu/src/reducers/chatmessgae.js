const chatStates = {

    message: '',
    messages: [],
    socketId: null
};



export const sendChat = () => {
    return {
        type: 'SEND_CHAT'
    }
}

export const receiveChat = (data) => {
    return {
        type: 'RECEIVE_CHAT',
        data
    }
}

const reducer = (state = chatStates, action) => {
    switch (action.type) {
        case 'SEND_CHAT':
            return {	
                ...state.user,
                isLoggedIn: true,
                me: action.data,
            };
        case 'RECEIVE_CHAT':
            let newChatList = state.chatList.slice();
            newChatList.push(action.data);
            return {	
                ...state,
                chatList: newChatList,
            };
        default:
            return state;
    }
};

export default reducer;