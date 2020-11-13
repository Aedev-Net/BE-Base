const BaseService = require('./base.service');
const Feedback = require('../models/feedback.model');
const FeedbackOption = require('../models/feedback-option.model');
const { Action, FeedbackStatus } = require('../common/constants');
const LogHelper = require('../common/helpers/log.helper');
const validatorHelper = require('../common/helpers/validator.helper');
const _ = require('lodash');

class UserFeedbackService extends BaseService {
    async getListFeedback(criteria) {
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        let query;
        const orgFilter = _.get(criteria, 'columns[4].search.value', '');
        if (orgFilter === 'all_org' || orgFilter === '') {
            query = {
                isDeleted: false,
            };
        } else {
            query = {
                isDeleted: false,
                organization: orgFilter,
            };
        }

        const populateQuery = [
            { path: 'organization', select: 'name' },
            { path: 'option', select: 'name' },
            { path: 'user', select: 'name' }
        ];
        if (checkedCriteria.search && checkedCriteria.search.value) {
            query.comment = new RegExp(checkedCriteria.search.value, "i");
        }

        const cntPromise = Feedback.find(query).countDocuments();
        const getPromise = Feedback.find(query)
            .sort({
                'rate': criteria['order'] ? criteria['order'][0]['dir'] : 1
            })
            .populate(populateQuery)
            .skip(checkedCriteria.start)
            .limit(checkedCriteria.length);
        const [cnt, feedbacks] = await Promise.all([cntPromise, getPromise]);

        return {
            data: feedbacks,
            recordsTotal: cnt,
            recordsFiltered: cnt,
        };
    }

    async getFeedbackOptions() {
        const query = {
            isDeleted: false,
            isActive: true,
        };

        let options = await FeedbackOption.find(query).lean();
        if (!options || options.length == 0) {
            const data = [
                {
                    name: 'bad_interface'
                },
                {
                    name: 'train_slowly'
                },
                {
                    name: 'load_slowly'
                },
            ];
            await FeedbackOption.insertMany(data);
            options = await FeedbackOption.find(query).lean();
        };

        return options;
    }

    async createFeedback(feedback, userId, orgId) {
        const feedbackModel = new Feedback(feedback);
        feedbackModel.organization = orgId;
        feedbackModel.user = userId;
        const newData = JSON.stringify(feedback);
        LogHelper.logAction(userId, Action.CreateUserFeedback, '', newData);
        await feedbackModel.save();
        return feedbackModel;
    }

    async verifyFeedback(id, userId) {
        const oldFeedback = await Feedback.findOne({ _id: id, isDeleted: false }).lean();
        if (!oldFeedback) return;
        const oldData = JSON.stringify(oldFeedback);
        await Feedback.updateOne({ _id: id }, { isVerify: FeedbackStatus.Verified });
        const newData = JSON.stringify(oldData);
        LogHelper.logAction(userId, Action.VerifyUserFeedback, oldData, newData);
        return oldFeedback;
    }
}

module.exports = new UserFeedbackService();