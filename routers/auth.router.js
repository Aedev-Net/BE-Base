'use strict';
const BaseRouter = require('./base.router');
const authController = require('../controllers/auth.controller');

const { HttpMethod } = require('../common/constants');
const Rights = require('../common/rights');

class AuthRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.POST, '/login', authController.login);
        this.route(HttpMethod.GET, '/token/:appId', authController.getAppToken);
        this.route(HttpMethod.POST, '/logout', authController.logout, [Rights.Basic]);
        this.route(HttpMethod.GET, '/checkUsername', authController.checkUsername);
        this.route(HttpMethod.POST, '/password/update', authController.updateForgotPassword);
        this.route(HttpMethod.GET, '/password/reset', authController.sendResetPasswordLink);
        this.route(HttpMethod.GET, '/external-token', authController.getNlpEngineSetting, [Rights.Basic]);
        this.route(HttpMethod.GET, '/external-token/reset', authController.resetAppSecret, [Rights.Basic]);
        this.route(HttpMethod.GET, '/external-token/reset-token', authController.resetAppToken, [Rights.Basic]);
        this.route(HttpMethod.POST, '/change-password', authController.changePassword, [Rights.Basic]);
        this.route(HttpMethod.POST, '/vnlp-tool/change-password', authController.vnlpToolChangePassword, [Rights.Basic]);
    }
}

module.exports = new AuthRouter();