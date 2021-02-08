import AccessToken from "../token/AccessToken";

export default class AccountRepository implements IAccountRepository {
    private client: HTTPClient;
    private token: AccessToken;

    constructor(client: HTTPClient, token: AccessToken) {
        this.client = client;
        this.token = token;
    }

    login(identifier: string, password: string): Promise<ILoginResult> {
        // TODO change url and params
        const url = `change here`;
        const params = {
            identifier: identifier,
            password: password,
        };
        return this.client.send(Method.POST, url, {}, JSON.stringify(params));
    }
}
