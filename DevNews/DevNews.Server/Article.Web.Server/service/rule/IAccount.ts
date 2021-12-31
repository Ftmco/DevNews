import { Activation, Login, SignUp } from "../../model/account";


export default interface IAccount {
    login(login: Login): any

    signUp(signup: SignUp): any

    getUserByUserName(userName: string): any;

    activation(activation: Activation): any;
}