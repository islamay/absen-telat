import { SIGNIN, SIGNUP, SIGNOUT } from './authTypes'

const emptyFunction = () => {}

const makeAuthenticate = (type, uri, statusNeeded, errorHandler) => {
  return async (payload) => {
    try {
      const response = await backendApi.post(uri, payload)
      
      if (response.status === statusNeeded) {
        const token = response.data.token
        const userData = _.omit(response.data, 'token')
        const stringifyUserData = JSON.stringify(userData)
        const storeToken = SecureStorage.setItemAsync('token', token)
        const storeUserData = SecureStorage.setItemAsync('user-data', stringifyUserData)
        const threads = [storeToken, storeUserData]
        await Promise.all(threads)
        return { type: type, payload: { token: token, userData: userData } }
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const guruSignIn = makeAuthenticate(SIGNIN, '/guru/login', 200, emptyFunction)

export const guruSignUp = makeAuthenticate(SIGNUP, '/guru/', 201, emptyFunction)

export const signOut = () => ({
    type: SIGNOUT,
})

