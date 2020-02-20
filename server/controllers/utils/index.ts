import { Response } from 'express';

export const response = (res: Response, statusCode: number, body: Object) => res.status(statusCode).json(body);
