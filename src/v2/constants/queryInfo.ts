import { ErrorResponse } from './api'


export interface QueryInfo<T> {
    data: T | undefined,
    isSuccess: boolean,
    isError: boolean,
    error: ErrorResponse,
}