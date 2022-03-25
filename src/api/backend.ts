import { BACKEND_URI } from '../helpers/env'
import axios from 'axios'

export interface RejectedResponse {
    name: string,
    message: string
}

const backendApi = axios.create({
    baseURL: BACKEND_URI,
    timeout: 10000
})


export default backendApi