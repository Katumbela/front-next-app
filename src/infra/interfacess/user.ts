export interface IUser {
    id?: number
    fullName: string
    nif: string
    email: string
    password: string
    userType: 'Provider' | 'Customer'
    balance: number
}