interface IAccountService {
    login(email: string, password: string): Promise<ILoginResult>;
}

interface ILoginResult {}
