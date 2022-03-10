import React, {useEffect} from 'react'
import { Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AuthContext from './src/hooks/AuthContext'
import useAuthContext from './src/hooks/useAuthContext'
import {userAccStatus} from './src/helpers/accountEnum'
import useAuthReducer from './src/hooks/useAuthReducer'
import useRestoreToken from './src/hooks/useRestoreToken'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AuthStackScreens from './src/navigation/AuthStackScreens'
import AuthenticatedGuruTabStackScreens from './src/navigation/AuthenticatedGuruTabStackScreens'
import WaitingStackScreens from './src/navigation/WaitingStackScreens'


const authError = {
  loginError: 'Email dan Password Tidak Cocok'
}

export default function App() {
  const [state, dispatch ] = useAuthReducer()
  const authContext = useAuthContext(dispatch)
  useRestoreToken(dispatch)
  // useEffect(() => {
  //   dispatch({type: 'LOGOUT'})
  // }, [])

  if (state.isLoading) {
    return <><Text>Loading...</Text></>
  }
  
  return (
    <AuthContext.Provider value={authContext}>
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
    </AuthContext.Provider>
  );
}