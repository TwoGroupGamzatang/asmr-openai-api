import { ExternalApiFailedException } from '../external-api-failed.exception';
import { ErrorCode } from '../../error.code';

export class OpenAiRequestFailedException extends ExternalApiFailedException {
    constructor() {
        super(ErrorCode.openAIRequestFailed);
        Object.setPrototypeOf(this, ExternalApiFailedException.prototype);
    }
}
