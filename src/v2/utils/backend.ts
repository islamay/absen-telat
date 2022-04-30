import axios, { AxiosError } from 'axios'
import { backend_url, ErrorResponse } from '../constants/api'

const backendApi = axios.create({
    baseURL: backend_url,
    timeout: 30000,

})

export default backendApi