interface HTTPClient {
    send(method : Method, url : string, header : any, body : any) : Promise<HTTPResponse>;
}

const enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    HEAD = "HEAD",
}

interface HTTPResponse {
    status : number;
    body : any;
}

/*
namespace Func {
    export function checkStatus(code : number) : (HTTPResponse) => Promise<HTTPResponse> {
        return (resp : HTTPResponse) => {
            if (resp.status == code) {
                return Promise.resolve(resp);
            } else {
                return Promise.reject(resp);
            }
        }
    }

    export var isStatus200 = checkStatus(200);

    export function getBody(resp : HTTPResponse) : string {
        return resp.body;
    }

    export function toTrue(resp : HTTPResponse) : boolean {
        return true;
    }

    export function getJSONArray(key : string) : (any) => any[] {
        return (json : any) => {
            return json[key];
        };
    }

    export function map<T>(func : (any) => T) : (any) => T[] {
        return (array : any[]) => {
            let list = [];
            array.forEach((item : any) => {
                list.push(func(item));
            });
            return list;
        };
    }
}
*/