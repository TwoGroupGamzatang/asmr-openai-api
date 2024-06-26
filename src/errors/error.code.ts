import { StatusCodes } from 'http-status-codes';

export class ErrorCode {
    // Common
    public static readonly invalidInputValue = new ErrorCode(
        'C01',
        'Invalid Input Value.',
        StatusCodes.BAD_REQUEST
    );
    public static readonly methodNotAllowed = new ErrorCode(
        'C02',
        'Invalid Method Type.',
        StatusCodes.METHOD_NOT_ALLOWED
    );
    public static readonly entityNotFound = new ErrorCode(
        'C03',
        'Entity Not Found.',
        StatusCodes.BAD_REQUEST
    );
    public static readonly methodArgumentNotValid = new ErrorCode(
        'C04',
        'Method Argument Not Valid.',
        StatusCodes.BAD_REQUEST
    );
    public static readonly notFound = new ErrorCode(
        'C05',
        'Not Found.',
        StatusCodes.NOT_FOUND
    );
    public static readonly internalServerError = new ErrorCode(
        'C06',
        'Internal Server Error.',
        StatusCodes.INTERNAL_SERVER_ERROR
    );

    // User
    public static readonly userAccessDenied = new ErrorCode(
        'U01',
        'User Access is Denied.',
        StatusCodes.UNAUTHORIZED
    );

    // External API
    public static readonly openAIRequestFailed = new ErrorCode(
        'E01',
        'OpenAI Request Failed.',
        StatusCodes.INTERNAL_SERVER_ERROR
    );

    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly status: number
    ) {}
}
