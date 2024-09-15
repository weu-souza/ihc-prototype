export interface ILogin {
    email:string;
    password:string;
}

export  interface IRegister extends ILogin{
    firstName:string;
    lastName:string;
}

export interface IPerfil extends IRegister{
    image:string;
    phone:string;
    address:string
}