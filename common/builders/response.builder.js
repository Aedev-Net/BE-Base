'use strict';

const { ResponseMessage } = require('../constants');
const { HttpCode, ErrorCode } = require('../enums');

function getMessageFromCode(code) {
    switch (code) {
        case HttpCode.InternalServerError:
            return ResponseMessage.InternalServerError;
        case HttpCode.BadRequest:
            return ResponseMessage.BadRequest;
        case HttpCode.Unauthorized:
            return ResponseMessage.Unauthorized;
        case HttpCode.Forbidden:
            return ResponseMessage.Forbidden;
        case HttpCode.NotFound:
            return ResponseMessage.ResourceNotFound;
        case HttpCode.ServiceUnavilable:
            return ResponseMessage.ServiceUnavilable;
        default:
            return ResponseMessage.InternalServerError;
    }
}

function getErrorCode(data) {
    const code = Number(data);
    return Number.isInteger(code) ? code : 0;
}

function getErrorMessage(code) {
    const message = getKeyByValue(ErrorCode, code);
    return message ? message.replace(/([A-Z])/g, ' $1').trim() : `${code}`;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getErrorResponse(httpCode, data) {
    const res = {
        success: false,
    };

    if (data) {
        res.errorCode = getErrorCode(data);
        res.errorMessage = res.errorCode ? getErrorMessage(res.errorCode) : getMessageFromCode(HttpCode.InternalServerError);
    } else {
        res.errorMessage = getMessageFromCode(httpCode);
    }

    return res;
}

function getSuccessResponse(data) {
    return {
        data,
        success: true,
    };
}

class ResponseBuilder {
    build(httpCode = HttpCode.OK, data) {
        switch (httpCode) {
            case HttpCode.OK:
                return getSuccessResponse(data);
            default:
                return getErrorResponse(httpCode, data);
        }
    }
}

module.exports = new ResponseBuilder();