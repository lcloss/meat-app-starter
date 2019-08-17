export class User {
    constructor(public email: string
              , public name: string
              , private password: string) { }

    matches(verifyUser: User): boolean  {
        return verifyUser !== undefined && verifyUser.email === this.email && verifyUser.password === this.password
    }
}

export const users: {[key: string]: User} = {
    "juliana@example.com": new User('juliana@example.com', 'Juliana', 'juliana123'),
    "amanda@example.com": new User('amanda@example.com', 'Amanda', 'amanda123')
}