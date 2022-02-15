import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import Account from '@/services/account'


const _headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
    "Token": Account.authenticationToken(),
    "Connection": "keep-alive"
}

const _confing: AxiosRequestConfig = {
    baseURL: "https://localhost:7131/api/",
    headers: _headers

}

export const changeConfigHeader = (key: any, value: string) => {
    _headers[key] = value;
};

export const apiCall = Axios.create(_confing)

