const state = {
    messages: []
}

const mutations = { 
    clearAllMessages (state) {
        state.messages = []
    },
    clearMessagesById (state, id) {
        state.messages = state.messages.filter(m => m.messageForId !== id);
    },
    addMessage (state, message) {
        state.messages.push(message)
    },
    addMessages (state, messages) {
        if(messages && messages.length)
            state.messages = state.messages.concat(messages)
    }
}

const getters = {
    messages (state) {
        return state.messages
    }
}

export default {
    state,
    mutations,
    getters
}