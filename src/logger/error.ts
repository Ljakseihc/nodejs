export class HttpError extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(404, message);
    }
}

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}
