export enum ErrorType {
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    COURSE_NOT_FOUND = 'COURSE_NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_COURSE_PASSWORD = 'INVALID_COURSE_PASSWORD',
    NOT_A_CREATOR = 'NOT_A_CREATOR',
    ALREADY_A_MEMBER = 'ALREADY_A_MEMBER',
}

export type ApiError = {
    errorType: ErrorType;
    message?: string;
    additionalData?: Record<string, unknown>;
};

export enum ValidationErrorType {
    MISSING = 'MISSING',
    NOT_UNIQUE = 'NOT_UNIQUE',
    START_TIME_AFTER_END = 'START_TIME_AFTER_END',
    TOO_SHORT_DURATION = 'TOO_SHORT_DURATION',
    TOO_LONG_DURATION = 'TOO_LONG_DURATION',
    TOO_SOON = 'TOO_SOON',
}

export type ValidationError = {
    fieldName: string;
    errorType: ValidationErrorType;
    args: Record<string, string>;
};
