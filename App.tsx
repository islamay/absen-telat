import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './src/store/store'
import { restoreAuth } from './src/store/thunks/authThunk'
import 'react-native-gesture-handler'
import InitialLoading from './src/screens/InitialLoading'
import RootStackScreens from './src/navigation/RootStack'

export default function App() {
  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restoreAuth())
  }, [])

  if (auth.isLoading) {
    return <InitialLoading />
  }


  return (
    <RootStackScreens />
  );
}