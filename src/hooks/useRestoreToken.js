import {useEffect} from 'react'
import * as SecureStorage from 'expo-secure-store'
import { reducerActionType } from './useAuthReducer'

const useRestoreToken = (dispatch) => {
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      let userData;
      try {
        const getTokenAsync =  SecureStorage.getItemAsync('token')
        const getUserDataAsync = SecureStorage.getItemAsync('user-data')
        const threads = [getTokenAsync, getUserDataAsync]
        const promiseResult = await Promise.all(threads)
        token = promiseResult[0]
        userData = promiseResult[1]
        userData = JSON.parse(userData)
      } catch (error) {
        console.log(error);
      }
      if (!token) {
        return dispatch({type: reducerActionType.stopLoadingState})
      }
      dispatch({type: reducerActionType.restoreToken, payload: {token: token, userData: userData}})
    }

    bootstrapAsync()
  }, [])

}

export default useRestoreToken