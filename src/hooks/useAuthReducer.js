import {useReducer} from 'react'

export const reducerActionType = {
  restoreToken: 'RESTORE_TOKEN',
  login: 'LOGIN',
  logout: 'LOGOUT',
  stopLoadingState: 'STOP_LOADING_STATE'
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case reducerActionType.restoreToken:
      return {
        ...prevState,
        userToken: action.payload.token,
        userData: action.payload.userData,
        isSignedIn: true,
        isSignedOut: false,
        isLoading: false
      }
    case reducerActionType.login:
      console.log(action);
      return {
        ...prevState,
        userToken: action.payload.token,
        userData: action.payload.userData,
        isSignedIn: true,
        isSignedOut: false,
        isLoading: false
      }
    case reducerActionType.logout:
      return {
        ...prevState,
        userToken: null,
        userData: {},
        isSignedIn: false,
        isSignedOut: true,
        isLoading: false
      }
    case reducerActionType.stopLoadingState:
      return {
        ...prevState,
        isLoading: false
      }
    default:
      return prevState
  }
}

const useAuthReducer = () => {
    const [state, dispatch] = useReducer(reducer, {userToken: null, userData: {}, isSignedIn: false, isSignedOut: true, isLoading: true})

    return [state, dispatch]
}

export default useAuthReducer


