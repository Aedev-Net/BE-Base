import { HttpCode, ErrorCode } from '../enum'
import { ResponseMessage, HttpMethod } from '../constants'
import { LooseObject } from '../interfaces'

function getMessageFromCode(code:number) {
    switch (code) {
        case HttpCode.InternalServerError:
            return ResponseMessage.InternalServerError;
        case HttpCode.BadRequest:
            return ResponseMessage.BadRequest;
        case HttpCode.Unauthorized:
            return ResponseMessage.Unauthorized;
        case HttpCode.Forbidden:
            return ResponseMessage.Forbidden;
        case HttpCode.ServiceUnavilable:
            return ResponseMessage.ServiceUnavilable;
        default:
            return ResponseMessage.InternalServerError;
    }
}

function getErrorCode(data:number) {
    const code = Number(data)
    return Number.isInteger(code) ? code : 0

}

function getErrorMessage(code:number) {
    const message = getKeyByValue(ErrorCode, code);
    return message ? message.replace(/([A-Z])/g, ' $1').trim() : `${code}`;
}

function getKeyByValue(object:any, value:number) {
    return Object.keys(object).find(key => object[key] === value);
}

function getErrorResponse(httpCode:number =HttpCode.OK, data:any) {
    const res: LooseObject = {
        success: false
    }
    if (data) {
        res.errorCode = getErrorCode(httpCode)
        res.errorMessage = res.errorCode ? getErrorMessage(res.errorCode) : getMessageFromCode(HttpCode.InternalServerError);
    } else {
        res.errorMessage = getMessageFromCode(httpCode);
    }
    return res;
}

function getSuccessResponse(data:any) {
    return {
        data,
        success: true
    }
}
class ResponseBuilder {
    constructor() { }
    build( httpCode: number = HttpCode.OK, data:any) {
        switch (httpCode) {
            case HttpCode.OK:
                return getSuccessResponse(data);
            default:
                return getErrorResponse(httpCode, data);
        }
    }
}

export { ResponseBuilder };
