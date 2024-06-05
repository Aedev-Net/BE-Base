const feedbackService = require('../services/feedback.service');
const BaseController = require('./base.controller');
const enums = require('../common/enums');
const ErrorCode = enums.ErrorCode

class FeedbackController extends BaseController {

    async getListFeedBack(req, res) {
        try {
            const feedbacks = await feedbackService.getListFeedback(req.query);
            if (!feedbacks) return this.error(res, ErrorCode.CannotGetFeedback);
            return res.json(feedbacks);
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotGetFeedback);
        }
    }

    async getFeedbackOptions(req, res) {
        try {
            const options = await feedbackService.getFeedbackOptions();
            if (!options) return this.error(res, ErrorCode.CannotGetFeedbackOption);
            return this.ok(res, options);
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotGetFeedbackOption);
        }
    }

    async createFeedback(req, res) {
        try {
            if (!req.body) return this.error(res, ErrorCode.CannotCreateFeedback);
            const userId = req.headers.userId;
            const orgId = req.org._id;
            const feedback = await feedbackService.createFeedback(req.body, userId, orgId);
            if (!feedback) return this.error(res, ErrorCode.CannotCreateFeedback);
            return this.ok(res, feedback);
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotCreateFeedback);
        }
    }

    async verifyFeedback(req, res) {
        try {
            if (!req.params.id) return this.error(res, ErrorCode.CannotVerifyFeedback);
            const id = req.params.id;
            const userId = req.headers.userId;
            const feedback = await feedbackService.verifyFeedback(id, userId);
            if (!feedback) return this.error(res, ErrorCode.CannotVerifyFeedback);
            return this.ok(res, feedback);
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotVerifyFeedback);
        }
    }
}

module.exports = new FeedbackController();