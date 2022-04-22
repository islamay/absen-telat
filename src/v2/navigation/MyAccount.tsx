import { StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyAccountDetail from '../screens/MyAccountDetail'

const MyAccountStack = createNativeStackNavigator()

const MyAccount = () => {
    return (
        <View style={styles.container} collapsable={false}>
            <MyAccountStack.Navigator initialRouteName='Detail'>
                <MyAccountStack.Screen
                    name='Detail'
                    component={MyAccountDetail}
                    options={{ headerShown: false }}
                />
            </MyAccountStack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MyAccount