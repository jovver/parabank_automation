export interface HomePageSignUp {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: number,
    phoneNumber: string,
    ssn: string,
    username: string,
    password: string,
    confirmPassword: string
}

export interface Login {
    userName: string,
    password: string
}