import {BACKEND_URI} from '../helpers/env'
import axios from 'axios'

const backendApi = axios.create({
    baseURL: BACKEND_URI
})

export default backendApi