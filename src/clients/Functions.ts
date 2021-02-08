/// <reference path="./HTTPClient.ts" />

export function checkStatus(code : number) : (resp: HTTPResponse) => Promise<HTTPResponse> {
    return (resp : HTTPResponse) => {
        if (resp.status == code) {
            return Promise.resolve(resp);
        } else {
            return Promise.reject(resp);
        }
    }
}

export const isStatus200 = checkStatus(200);

export function getBody(resp : HTTPResponse) : string {
    return resp.body;
}

export function toTrue(resp : HTTPResponse) : boolean {
    return true;
}

export function getJSONArray(key : string) : (json: any) => any[] {
    return (json : any) => {
        return json[key];
    };
}