import { StyleSheet } from 'react-native'
import VAR from './VAR'
import {vw} from '../helpers/viewport'

const styles = ({width, height}) => {
    return StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: VAR.white,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        height: height ? height : 'auto',
        width: width ? width : 'auto',
        maxWidth: '90%',
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        
    }
})
}

export default styles