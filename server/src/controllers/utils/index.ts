import { Response } from 'express';


export const response = (res: Response, statusCode: number, body: Record<string, any>) => res.status(statusCode).json(body);
