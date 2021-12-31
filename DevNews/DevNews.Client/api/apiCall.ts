import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'


const _header: AxiosRequestHeaders = {
    "Content-Type": 'application/json',
}

const _config: AxiosRequestConfig = {
    baseURL: 'http://localhost:1337/api/',
    timeout: 60 * 1000,
    headers: _header
}


export const apiCall = Axios.create(_config)