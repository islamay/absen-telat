import React, {useEffect} from 'react'
import { Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import useAuthContext from './src/hooks/useAuthContext'
import {userAccStatus} from './src/helpers/accountEnum'
import useAuthReducer from './src/hooks/useAuthReducer'
import useRestoreToken from './src/hooks/useRestoreToken'
import AuthStackScreens from './src/navigation/AuthStackScreens'
import AuthenticatedGuruTabStackScreens from './src/navigation/AuthenticatedGuruTabStackScreens'
import WaitingStackScreens from './src/navigation/WaitingStackScreens'
import {useSelector} from 'react-redux'

const authError = {
  loginError: 'Email dan Password Tidak Cocok'
}

export default function App() {
  const [state, dispatch ] = useAuthReducer()
  const authContext = useAuthContext(dispatch)
  const authReducer = useSelector(state => state.authReducer)

  useRestoreToken(dispatch)
  // useEffect(() => {
  //   dispatch({type: 'LOGOUT'})
  // }, [])

  if (state.isLoading) {
    return <><Text>Loading...</Text></>
  }

  console.log(authReducer);
  
  return (
        <NavigationContainer>
          {
            state.userToken === null
            ? <AuthStackScreens state={state} /> : (
              state.userData && state.userData.status === userAccStatus.AKTIF 
              ? <AuthenticatedGuruTabStackScreens />
              : state.userData && state.userData.status === userAccStatus.MENUNGGU && <WaitingStackScreens />
              )
            }
          
        </NavigationContainer>
  );
}