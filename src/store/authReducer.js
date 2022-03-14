import {RESTORE_TOKEN, SIGNIN, SIGNUP, SIGNOUT} from './authTypes'

const initialState = {
    userToken: '',
    isLoading: true
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.payload.token,
                isLoading: action.payload.false
            }
        case SIGNIN:
            return {
                ...state,
                userToken: action.payload.token
            }
        case SIGNOUT: 
            return {
                ...state,
                userToken: ''
            }
        default:
            return state
    }
}

export default authReducer