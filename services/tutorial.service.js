const Tutorial = require('../models/tutorial.model');
const validatorHelper = require('../common/helpers/validator.helper');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class TutorialService {
    async createTutorial(tutorial, userId) {
        const tutorialModel = new Tutorial(tutorial);
        const newData = JSON.stringify(tutorial);
        LogHelper.logAction(userId, Action.CreateTutorial, '', newData);
        await tutorialModel.save();
    }

    async updateTutorial(tutorial, userId) {
        const oldTutorial = await Tutorial.findOne({ _id: tutorial._id, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldTutorial);
        await Tutorial.updateOne({ _id: tutorial._id }, tutorial);
        const newTutorial = await Tutorial.findOne({ _id: tutorial._id, isDeleted: false }).lean();
        const newData = JSON.stringify(newTutorial);
        LogHelper.logAction(userId, Action.UpdateTutorial, oldData, newData);
    }

    async getTutorialsByType(type) {
        const tutorials = await Tutorial.find({
            type: type,
            isDeleted: false,
        });
        return tutorials;
    }

    async getTutorialById(id) {
        const tutorial = await Tutorial.findOne({
            _id: id,
            isDeleted: false,
        });
        return tutorial;
    }

    async deleteTutorialById(id, userId) {
        if (!id) throw new Error(ErrorCode.CannotGetTutorial);

        const tutorial = await Tutorial.findById(id);
        if (!tutorial) throw new Error(ErrorCode.CannotDeleteTutorial);

        tutorial.isDeleted = true;
        LogHelper.logAction(userId, Action.DeleteTutorial, id, '');
        return await tutorial.save();
    }

    async getAllTutorials() {
        const tutorials = await Tutorial.find({ isDeleted: false }).select('title');
        return tutorials;
    }

    async getTutorials(criteria) {
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        const searchTerm = typeof criteria.search == 'string' ? criteria.search : criteria.search.value;

        const query = {
            isDeleted: false,
        };
        if (searchTerm && searchTerm.trim()) {
            query['$or'] = [
                {
                    title: new RegExp(searchTerm.trim(), "i"),
                },
                {
                    description: new RegExp(searchTerm.trim(), "i"),
                },
                {
                    content: new RegExp(searchTerm.trim(), "i"),
                }
            ];
        }

        const cntPromise = Tutorial.find(query).countDocuments();
        const getPromise = Tutorial.find(query)
            .sort({
                'title': 1
            })
            .skip(checkedCriteria.start)
            .limit(checkedCriteria.length);
        const [cnt, tutorials] = await Promise.all([cntPromise, getPromise]);

        return {
            data: tutorials,
            recordsTotal: cnt,
            recordsFiltered: cnt,
        };
    }
}

module.exports = new TutorialService();
