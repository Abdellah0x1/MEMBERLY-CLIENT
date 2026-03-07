
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
export type MemberSingupPayload = {
        name: string,
        email: string,
        password: string,
        passwordConfirm: string,
}



export type User = {
    name: string,
    email: string,
    _id: string,
    role: string,
    picture?: string,
    gymId: string
}
