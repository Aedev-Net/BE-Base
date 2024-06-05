'use strict';
const BaseRouter = require('./base.router');
const botController = require('../controllers/bot.controller');

const { HttpMethod } = require('../common/constants');
const Rights = require('../common/rights');

class BotRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.POST, '', botController.getNlp, [Rights.Basic]);
        this.route(HttpMethod.POST, '/user', botController.getUserById, [Rights.Basic]);
    }
}

module.exports = new BotRouter();