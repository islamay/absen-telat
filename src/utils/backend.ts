import axios from 'axios'
import Constant from 'expo-constants'

const backendApi = axios.create({
    baseURL: Constant.manifest?.extra?.backend_url,
    timeout: 30000,

})

export default backendApi