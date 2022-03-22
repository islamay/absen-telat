import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { userAccStatus } from './src/helpers/accountEnum'
import AuthStack from './src/navigation/GuestStack'
import GuruStack from './src/navigation/GuruStack'
import WaitingStack from './src/navigation/WaitingStack'
import { useSelector } from 'react-redux'
import { RootState } from './src/store/store'


export default function App() {
  const { auth, user } = useSelector((state: RootState) => state)

  console.log(auth, user);


  return (
    <NavigationContainer>
      {
        !auth.token
          ? <AuthStack />
          : !user.isWaiting
            ? <GuruStack />
            : <WaitingStack />
      }
    </NavigationContainer>
  );
}