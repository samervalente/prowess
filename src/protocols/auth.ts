export interface SignUpInputFields  {
    firstname: string,
    surname: string,
    gender: string,
    birthDate: string,
    email: string,
    password: string,
    phone: string;
    image: any;
    passwordConfirmation: string;
    [key: string]: string;
}

export interface LoggedUser {
    name:string,
    imageUrl:string;
    token:string;
    countPosts: number;
}