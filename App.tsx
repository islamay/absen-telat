import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './src/store/store'
import { restoreAuth } from './src/store/thunks/authThunk'
import 'react-native-gesture-handler'
import InitialLoading from './src/screens/InitialLoading'
import RootStackScreens from './src/navigation/RootStack'
import { Provider as ReduxProvider } from 'react-redux'
// V2
import Root from './src/v2/navigation/Root'
import useInitialize from './src/v2/hooks/useInitialize'
import store from './src/v2/redux/store'

// export default function App() {
//   const { auth } = useSelector((state: RootState) => state)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(restoreAuth())
//   }, [])

//   if (auth.isLoading) {
//     return <InitialLoading />
//   }


//   return (
//     <RootStackScreens />
//   );
// }

export default function App() {
  const initialized = useInitialize()

  if (!initialized) {
    return <InitialLoading />
  }



  return (
    <ReduxProvider store={store}>
      <Root />
    </ReduxProvider>
  );
}