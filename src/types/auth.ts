
export type LoginPayload = {
    email: string,
    password: string
}

export type OwnerSingupPayload = {
    owner : {
        name: string,
        email: string,
        password: string,
        passwordConfirm: string,
    }
    gymName: string,
}



export type User = {
    name: string,
    email: string,
    _id: string,
    role: string,
    picture?: string
}
