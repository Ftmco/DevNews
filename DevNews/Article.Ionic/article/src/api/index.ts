import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import Account from '@/services/account'


const _headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
    "Token": Account.authenticationToken(),
}

const _confing: AxiosRequestConfig = {
    baseURL: " http://192.168.43.198:2050/api/",
    timeout: 60 * 1000,
    headers: _headers

}

export const changeConfigHeader = (key: any, value: string) => {
    _headers[key] = value;
};

export const apiCall = Axios.create(_confing)

