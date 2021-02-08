export default class AccessToken {
    token: string;
    refresh: string;

    constructor() {
        try {
            this.token = localStorage.getItem("token") as string;
            this.refresh = localStorage.getItem("refresh") as string;
        } catch (err) {
            this.token = "";
            this.refresh = "";
        }
    }

    save(token: string, refresh: string) {
        this.token = token;
        this.refresh = refresh;
        try {
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
        } catch (err) {
            // nop
        }
    }

    isLoggedIn(): boolean {
        return this.token.length > 0;
    }
}
