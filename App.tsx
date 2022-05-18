import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import { Provider as ReduxProvider } from 'react-redux'
import Root from './src/navigation/Root'
import useInitialize from './src/hooks/useInitialize'
import store from './src/redux/store'
import { ActivityIndicator } from 'react-native-paper'
import styleGuide from './src/constants/styleGuide'
import { useAppSelector } from './src/hooks/redux'


const App = () => {
  const initialized = useInitialize()

  if (!initialized) {
    return (
      <ActivityIndicator
        size={styleGuide.fontBig}
        color={styleGuide.colorPrimary}
      />
    )
  }
  return (
    <Root />
  );
}

export default function AppContainer() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  )
}