import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AccStatus } from './src/helpers/accountEnum'
import AuthStack from './src/navigation/GuestStack'
import GuruStack from './src/navigation/GuruStack'
import WaitingStack from './src/navigation/WaitingStack'
import { useSelector } from 'react-redux'
import { RootState } from './src/store/store'
import 'react-native-gesture-handler'

export default function App() {
  const { auth, user } = useSelector((state: RootState) => state)

  console.log(auth.token);


  return (
    <NavigationContainer>
      {
        !auth.token
          ? <AuthStack />
          : auth.status === AccStatus.AKTIF
            ? <GuruStack />
            : <WaitingStack />
      }
    </NavigationContainer>
  );
}