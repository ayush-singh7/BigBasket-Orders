import { Request } from 'express';
import { AcceptAny } from './types';

interface Response {
    status: string;
    code: number;
    timestamp: number;
}

export interface GrpcResponse extends Response {
    data: string;
    error: string;
}

export interface HttpResponse extends Response {
    data: Record<string, AcceptAny> | null;
    error: Record<string, AcceptAny> | null;
}

export interface CustomRequest extends Request {
    
    
    userData?: any;
    sessionData?: any;
}
