const autoBind = require('auto-bind');
const responseBuilder = require('../common/builders/response.builder');
const { HttpCode } = require('../common/enums');

class BaseController {
    constructor() {
        autoBind(this);
    }

    ok(res, data) {
        const body = responseBuilder.build(HttpCode.OK, data);
        res.json(body);
    }

    error(res, message, httpCode = HttpCode.InternalServerError) {
        const body = responseBuilder.build(httpCode, message);
        res.status(httpCode).send(body);
    }
}

module.exports = BaseController;
