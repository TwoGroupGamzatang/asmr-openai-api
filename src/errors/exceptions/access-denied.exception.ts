import { ErrorCode } from '../error.code';

export class AccessDeniedException extends Error {
    errorCode: ErrorCode;

    constructor(errorCode: ErrorCode) {
        super(errorCode.message);
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, Error.prototype);
    }
}
