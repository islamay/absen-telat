import { registerRootComponent } from 'expo';
import store from './src/store/store'
import {Provider as ReduxProvider} from 'react-redux'
import App from './App';

const AppWithRedux = () => {
    return (
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWithRedux);
