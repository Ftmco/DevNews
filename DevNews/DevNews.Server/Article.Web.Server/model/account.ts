export type Login = {
    userName: string;
    password: string;
}

export type SignUp = {
    fullName: string;
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export type Activation = {
    userName: string;
    activeCode: string;
}