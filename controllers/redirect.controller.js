'use strict';

const BaseController = require('./base.controller');
const redirectService = require('../services/redirect.service');
const enums = require('../common/enums');
const HttpCode = enums.HttpCode;
const ErrorCode = enums.ErrorCode;

class RedirectController extends BaseController {
    async redirect(req, res) {
        try {
            const originalUrl = req.originalUrl;
            const method = req.method;
            const headers = req.headers;
            const body = req.body;
            const resData = await redirectService.redirect(originalUrl, method, headers, body);
            if (!resData) return this.error(res, ErrorCode.NoDataResponse);
            return res.json(resData);
        } catch (err) {
            if (err) {
                console.error(err);
                return this.error(res, err.body.message, err.statusCode);
            }
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async uploadFileData(req, res, next) {
        try {
            const originalUrl = req.originalUrl;
            const method = req.method;
            const headers = req.headers;
            const body = req.body;
            const resData = await redirectService.uploadFile(originalUrl, method, headers, body, req);
            if (!resData) return this.error(res, ErrorCode.NoDataResponse);
            if (resData.success) return res.json(resData);
            return this.error(res, resData.message);
        } catch (err) {
            if (err) {
                console.error(err);
                return this.error(res, err.statusCode, err.message);
            }
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async uploadFileAudio(req, res, next) {
        try {
            const originalUrl = req.originalUrl;
            const method = req.method;
            const headers = req.headers;
            const body = req.body;
            const resData = await redirectService.uploadFileAudio(originalUrl, method, headers, body, req);
            if (!resData) return this.error(res, ErrorCode.NoDataResponse);
            if (resData.success) return res.json(resData);
            return this.error(res, resData.message);
        } catch (err) {
            if (err) {
                console.error(err);
                return this.error(res, err.statusCode, err.message);
            }
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }
}

module.exports = new RedirectController();