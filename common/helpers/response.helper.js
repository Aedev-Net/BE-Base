"use strict"

const ResponseStatus = {
    Success: 0,
    Error: 1
};

const ResponseMessage = {
    ObjectNotFound: 'Object not found',
    OperationFailed: 'The operation failed',
    TokenInvalid: 'Token is invalid',
    InputInvalid: 'Input is invalid',
    PromotionNotFound : 'Promotion not found',
    PhoneNotFound : 'Phone number is not existed'
};

class ResponseHelper {
    static build(responseStatus, result) {
        switch (responseStatus) {
            case ResponseStatus.Success:
                return {
                    success: true,
                    data: result
                }
            default:
                return {
                    success: false,
                    error: result
                }

        }
    }
}

module.exports = { ResponseStatus, ResponseMessage, ResponseBuilder: ResponseHelper };
