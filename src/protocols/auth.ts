export type SignUpInputFields = {
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

