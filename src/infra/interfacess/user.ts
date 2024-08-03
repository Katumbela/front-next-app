export interface IUser {
    id?: number
    fullName: string
    nif: string
    email: string
    password: string
    userType: 'provider' | 'customer'
    balance: number
}