import { Response } from 'express';

export type Error = {
    payload: {
        message: string,
        additional_info?: any
    } | any,
    statusCode: number
} | Array<object> | object | any;

export type FormattedError = {
    status: 'failed',
    statusCode?: number,
    errors: Array<{
        message?: string,
        statusCode?: number,
        code?: string,
        additional_info?: any
    }>
}

export type FormattedSuccess = {
    status: 'success',
    statusCode?: number,
    data: any
}

export function formatError(err: Array<object> | object, statusCode: number) : object{
    if(!Array.isArray(err)){
        err = [err];
    } 
    return {
        status: 'failed',
        statusCode: statusCode,
        errors: err
    }
}

export function constructError(res: Response, err: any, statusCode?: number) : Response{
    if(err.statusCode){
        if(!err.payload){
            let {statusCode, ...payload} = err;
            err.payload = payload;
        } 
        return constructError(res, err.payload, err.statusCode);
    }
    if(Array.isArray(err)){
        return res.status(statusCode ?? 400).json(formatError(err, statusCode ?? 400));
    }
    if(typeof err == 'object' && err.message){
        return res.status(statusCode ?? 400).json(formatError(err, statusCode ?? 400));
    }
    return res.status(statusCode ?? 500).json(formatError({ message: 'Something Went Wrong ', additional_info: err }, statusCode ?? 500))
}

export function formatSuccess(data: any, statusCode: number = 200) : object{
    return {
        status: 'success',
        statusCode: statusCode,
        data: data
    }
}