import React, { useContext } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import LightBlueScreen from '../components/LightBlueScreen'
import { useDispatch, useSelector } from 'react-redux'
import auth from '../store/auth'
import { RootState } from '../store/store'
import Input from '../components/Input'
import Button from '../components/Button'
import { signOut } from '../store/thunks/authThunk'


const AccountDetails = () => {
    const dispatch = useDispatch()
    const { auth, user } = useSelector((state: RootState) => state)

    const onSignoutButtonPressed = () => {
        dispatch(signOut())
    }

    return (
        <LightBlueScreen>
            <View style={styles.container}>
                <Input
                    hint='Nama'
                    editable={false}
                    defaultValue={user.namaLengkap}
                    selectTextOnFocus={false}
                />

                <Input
                    hint='Email'
                    editable={false}
                    defaultValue={user.email}
                    selectTextOnFocus={false}
                />

                {
                    user.type === 'GURU'
                        ? <>
                            <Input
                                hint='Role'
                                editable={false}
                                defaultValue={user.role}
                                selectTextOnFocus={false}
                            />
                        </>
                        : <>
                            <Input
                                hint='Kelas'
                                editable={false}
                                defaultValue={user.fullClass}
                                selectTextOnFocus={false}
                            />
                        </>
                }

                <Input
                    hint='Status'
                    editable={false}
                    defaultValue={user.status}
                    selectTextOnFocus={false}
                />

                <Button
                    style={{ marginTop: 50 }}
                    onPress={onSignoutButtonPressed}
                    text='Signout'
                />

            </View>
        </LightBlueScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default AccountDetails