declare module 'express' {
    interface Request {
        headers: IncomingHttpHeaders;
        user?: any;
    }
}