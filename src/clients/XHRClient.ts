/// <reference path="./HTTPClient.ts"/>

export default class XHRClient implements HTTPClient {
    private respType : XMLHttpRequestResponseType;

    constructor(respType : XMLHttpRequestResponseType) {
        this.respType = respType;
    }

    send(method : Method, url : string, header : any, body : any) : Promise<HTTPResponse> {
        if (header == null) {
            throw 'header must not be null';
        }
        return new Promise<HTTPResponse>((resolve : (r: HTTPResponse) => void, reject : (e: any) => void) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = this.respType;
            for (var key in header) {
                xhr.setRequestHeader(key, header[key]);
            }
            xhr.onload = function () {
                resolve({
                    status: this.status,
                    body: this.response
                });
            };
            xhr.onerror = (e : any) => {
                reject(e);
            };
            
            if (body == null) {
                xhr.send();
            } else {
                xhr.send(body);
            }
        });
    }
}