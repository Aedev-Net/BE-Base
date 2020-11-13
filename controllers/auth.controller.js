'use strict';

const BaseController = require('./base.controller');
const authService = require('../services/auth.service');
const appConfig = require('../configs/app.config');

const { ErrorCode, HttpCode } = require('../common/enums');

class AuthController extends BaseController {
    async login(req, res) {
        try {
            const credentials = {
                username: req.body.username,
                password: req.body.password
            }
            const token = await authService.login(credentials, req.headers['user-agent']);
            
            return this.ok(res, token);
        } catch (err) {
            console.error(err);
            const httpCode = err.message == ErrorCode.UsernameOrPasswordIsIncorrect ? HttpCode.BadRequest : HttpCode.InternalServerError;
            return this.error(res, err.message, httpCode);
        }
    }

    async logout(req, res) {
        try {
            await authService.logout(req.token.tokenId, req.headers.userId);
            return this.ok(res);
        } catch (err) {
            console.error(err);
            return this.error(res, err.message);
        }
    }

    async verify(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (token == appConfig.serverApiKey) {
                if (req.headers.engineid) req.headers.orgId = req.headers.engineid;
                return next();
            }

            if (req.headers.type == 'app' && token && token.length <= 100) {
                const engine = await authService.verifyAppId(token);
                if (engine) {
                    req.headers.engineId = engine._id;
                    req.headers.orgId = engine.organization;
                    req.headers.isTwoChannels = engine.isTwoChannels;
                    return next();
                }
            }

            const userAgent = req.headers['user-agent'];
            const url = req.originalUrl;
            const method = req.method;
            const data = await authService.verifyToken(token, userAgent, url, method);

            req.user = data.user;
            req.org = data.org;
            req.token = {
                token: token,
                tokenId: data.tokenId
            }

            req.headers.userId = req.user && req.user._id;
            req.headers.orgId = req.org && req.org._id;
            let engine;
            if (!req.headers.engineid) {
                engine = await authService.getNlpEngineByOrgId(req.org._id);
                if (engine) {
                    req.headers.engineId = engine._id;
                    req.headers.isTwoChannels = engine.isTwoChannels;
                    req.headers.isMultiIntents = engine.isMultiIntents;
                    req.nlpEngine = engine;
                }
                return next();
            }

            engine = await authService.getNlpEngineById(req.headers.engineid);
            if (!engine || !engine.organization || (engine.organization._id.toString() != req.org._id.toString())) return this.error(res, ErrorCode.UnauthorizedOrg, HttpCode.Unauthorized);
            req.headers.engineId = engine._id;
            req.headers.isTwoChannels = engine.isTwoChannels;
            req.headers.isMultiIntents = engine.isMultiIntents;
            req.nlpEngine = engine;

            return next();
        } catch (err) {
            console.error(err);
            return this.error(res, err.message);
        }

    }

    async getAppToken(req, res) {
        const appId = req.params.appId;
        const appSecret = req.query.app_secret;
        const token = await authService.getAppTokenByAppIdAndAppSecret(appId, appSecret);
        return this.ok(res, token);
    }

    async checkUsername(req, res, next) {
        const data = await authService.checkUsername(req.query.username);
        return res.json(data);
    }

    async getNlpEngineSetting(req, res) {
        try {
            const engineId = req.nlpEngine._id;
            const data = await authService.getNlpEngineSetting(engineId);
            if (!data) return this.error(res);
            return this.ok(res, data);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message, 400);
        }
    }

    async resetAppSecret(req, res) {
        try {
            const engineId = req.nlpEngine._id;
            const data = await authService.resetAppSecret(engineId);
            if (!data) return this.error(res);
            return this.ok(res, data);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message, 400);
        }
    }

    async resetAppToken(req, res) {
        try {
            const engineId = req.nlpEngine._id;
            const data = await authService.resetAppToken(engineId);
            if (!data) return this.error(res);
            return this.ok(res, data);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message, 400);
        }
    }

    async changePassword(req, res) {
        try {
            const result = await authService.changePassword(req.user._id, req.body);
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message);
        }
    }

    async vnlpToolChangePassword(req, res) {
        try {
            const result = await authService.vnlpToolChangePassword(req.user._id, req.body);
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message);
        }
    }

    async sendResetPasswordLink(req, res) {
        try {
            const result = await authService.sendResetPasswordLink(req.query.username, req.headers.origin);
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message);
        }
    }

    async updateForgotPassword(req, res) {
        try {
            const result = await authService.updateForgotPassword(req.body.password, req.query.token);
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            return this.error(res, error.message);
        }
    }
}

module.exports = new AuthController();