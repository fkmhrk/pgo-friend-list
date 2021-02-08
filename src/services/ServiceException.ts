export default class ServiceException {
    code: number;
    cause: any;
    constructor(code: number, cause: any) {
        this.code = code;
        this.cause = cause;
    }
}
