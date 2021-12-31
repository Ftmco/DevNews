export type ApiResponse = {
    status: boolean;
    code: number;
    title: string;
    message: string;
    result: any
}

export const success = (title: string, message: string, result: any): ApiResponse => ({
    title: title,
    code: 200,
    result: result,
    message: message,
    status: true
})

export const faild = (code: number, title: string, message): ApiResponse => ({
    code: code,
    message: message,
    result: {},
    status: false,
    title: title
})

export const exception = (message:string): ApiResponse => ({
    code: 500,
    message: message,
    title: 'Exception',
    result: {},
    status: false
})