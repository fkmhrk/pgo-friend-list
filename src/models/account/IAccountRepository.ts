interface IAccountRepository {
    login(identifier: string, password: string): Promise<ILoginResult>;
}

// TODO change actual response
interface ILoginResult {}
