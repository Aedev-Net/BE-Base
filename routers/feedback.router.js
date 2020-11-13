'use strict';
const BaseRouter = require('./base.router');
const feedbackController = require('../controllers/feedback.controller');
const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class UserRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', feedbackController.getListFeedBack, [Right.AdminViewFeedbacks]);
        this.route(HttpMethod.POST, '', feedbackController.createFeedback, [Right.BotCreateFeedback]);
        this.route(HttpMethod.PUT, '/:id', feedbackController.verifyFeedback, [Right.AdminUpdateFeedback]);
        this.route(HttpMethod.GET, '/options', feedbackController.getFeedbackOptions, [Right.BotViewFeedbackOption]);
    }
}

module.exports = new UserRouter();