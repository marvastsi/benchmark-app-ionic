export interface HttpException {
    status?: number | undefined;
    message?: string | undefined;
}

interface HttpExceptionConstructor {
    new(
        status: number,
        message: string,
    ): HttpException;
}

declare var HttpException: HttpExceptionConstructor;
