import { useFonts } from 'expo-font'
import styles from '../constants/styleGuide'

const useLoadFont = () => {
    const [loaded, error] = useFonts({
        [styles.KanitFont.semibold]: require('../assets/fonts/Kanit-SemiBold.ttf')
    })




    return loaded
}

export default useLoadFont