import { ResponseBuilder } from "../common/builders/response.builder";
import { HttpCode } from "../common/enum";
import { Response } from "express";

class BaseController {
    constructor() {

    }
    ok(res: Response, data: any) {
        const body = new ResponseBuilder().build(res.statusCode, data);
        res.json(body);
    }

    error(res: Response, message: string, httpCode = HttpCode.InternalServerError) {
        const body = new ResponseBuilder().build(httpCode, message);
        res.status(httpCode).send(body);
    }
}

export default BaseController;