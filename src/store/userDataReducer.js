import {FILL_DATA, WIPE_DATA} from './userDataTypes'

const initialState = {
    userData: {}
}

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILL_DATA:
            return {
                ...state,
                userData: action.payload.userData
            }
        case WIPE_DATA:
            return {
                ...state,
                userData: {}
            }
        default:
            return state
    }
}

export default userDataReducer