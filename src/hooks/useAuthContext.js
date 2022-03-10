import {useMemo} from 'react'
import backendApi from '../api/backend'
import { reducerActionType } from './useAuthReducer'
import * as SecureStorage from 'expo-secure-store'
import _ from 'lodash'

const makeAuthenticate = (type, uri, statusNeeded, dispatch, errorHandler) => {
  return async (payload) => {
    try {
      const response = await backendApi.post(uri, payload)
      console.log('A');
      
      if (response.status === statusNeeded) {
        const token = response.data.token
        const userData = _.omit(response.data, 'token')
        const stringifyUserData = JSON.stringify(userData)
        const storeToken = SecureStorage.setItemAsync('token', token)
        const storeUserData = SecureStorage.setItemAsync('user-data', stringifyUserData)
        const threads = [storeToken, storeUserData]
        await Promise.all(threads)
        dispatch({type: type, payload: {token: token, userData: userData}})
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}

const emptyFunction = () => {
  // Empty
}

const useAuthContext = (dispatch) => {
    const authContext = useMemo(() => ({
    signInSiswa: async ({email, password}) => {
      try {
        const response = await backendApi.post('/siswa/login', {email, password})
        if (response.status === 200) {
          const storeTokenToStorage = SecureStorage.setItemAsync('token', response.data.token)
          const storeUserAccStatusToStorage = SecureStorage.setItemAsync('acc-status', response.data.status)
          const threads = [storeTokenToStorage, storeUserAccStatusToStorage]
          await Promise.all(threads)
        }
      } catch (error) {
        console.log(error.message);
        return;
      }
    },

    signInGuru: makeAuthenticate(reducerActionType.login, '/guru/login', 200, dispatch, emptyFunction),

    // signUpSiswa: async ({namaLengkap, nis, email, password}) => {
    //   try {
    //     const response = await backendApi.post('/siswa', {namaLengkap, nis, email, password})
    //     if (response.status === 201) {
    //       const storeTokenToStorage = SecureStorage.setItemAsync('token', response.data.token)
    //       const storeUserAccStatusToStorage = SecureStorage.setItemAsync('acc-status', response.data.status)
    //       const threads = [storeTokenToStorage, storeUserAccStatusToStorage]
    //       await Promise.all(threads)
    //       dispatch({type: reducerActionType.login, payload: { token: response.data.token, status: response.data.status}})
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //     return;
    //   }
    // },

    // signInGuru: async ({email, password}) => {
    //   try {
    //     const response = await backendApi.post('/guru/login', {email, password})
    //     if (response.status === 200) {
    //       const storeTokenToStorage = SecureStorage.setItemAsync('token', response.data.token)
    //       const storeUserAccStatusToStorage = SecureStorage.setItemAsync('acc-status', response.data.status)
    //       const threads = [storeTokenToStorage, storeUserAccStatusToStorage]
    //       await Promise.all(threads)
    //       dispatch({type: reducerActionType.login, payload: {token: response.data.token, status: response.data.status}})
    //     }
    //   } catch (error) {
    //     throw new Error(authError.loginError)
    //   }
    // },

    signUpGuru: async ({namaLengkap, email, telepon, password}) => {
      try {
        const response = await backendApi.post('/guru', {namaLengkap, email, password, telepon})
        if (response.status === 201) {
          const storeTokenToStorage = SecureStorage.setItemAsync('token', response.data.token)
          const storeUserAccStatusToStorage = SecureStorage.setItemAsync('acc-status', response.data.status)
          const threads = [storeTokenToStorage, storeUserAccStatusToStorage]
          await Promise.all(threads)
          dispatch({type: reducerActionType.login, payload: {token: response.data.token, status: response.data.status}})
        }
      } catch (error) {
        console.log(error.message);
        return;
      }
    },

    signOut: async () => {
      try {
        const deleteTokenFromStorage = SecureStorage.deleteItemAsync('token')
        const deleteUserAccStatusFromStorage = SecureStorage.deleteItemAsync('acc-status')
        const threads = [deleteTokenFromStorage, deleteUserAccStatusFromStorage]
        await Promise.all(threads)
        dispatch({type: reducerActionType.logout})
      } catch (error) {
        console.log(error.message);
        return;
      }
    }
  }), [])

  return authContext
}

export default useAuthContext