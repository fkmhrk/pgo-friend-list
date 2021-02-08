import ServiceException from "../ServiceException";

export default class AccountService implements IAccountService {
    private repo: IAccountRepository;

    constructor(repo: IAccountRepository) {
        this.repo = repo;
    }

    async login(email: string, password: string): Promise<ILoginResult> {
        try {
            const result = await this.repo.login(email, password);
            return {};
        } catch (e) {
            throw new ServiceException(-1, e);
        }
    }
}
