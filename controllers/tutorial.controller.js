'use strict';

const BaseController = require('./base.controller');
const tutorialService = require('../services/tutorial.service');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class TutorialController extends BaseController {
    async getTutorialsByType(req, res) {
        try {
            const type = req.query.type;
            if (type) {
                const tutorials = await tutorialService.getTutorialsByType(type);
                if (tutorials) return this.ok(res, tutorials);
                return this.error(res, ErrorCode.TutorialNotFound);
            } else {
                const tutorials = await tutorialService.getTutorials(req.query);
                return res.json({
                    draw: tutorials.draw,
                    success: true,
                    data: tutorials.data,
                    recordsTotal: tutorials.recordsTotal,
                    recordsFiltered: tutorials.recordsFiltered,
                });
            }
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetTutorial);
        }
    }

    async createTutorial(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await tutorialService.createTutorial(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotCreateTutorial);
        }
    }

    async updateTutorial(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await tutorialService.updateTutorial(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotUpdateTutorial);
        }
    }

    async getTutorialById(req, res) {
        try {
            const _id = req.params.id;
            const tutorial = await tutorialService.getTutorialById(_id);
            if (tutorial) return this.ok(res, tutorial);
            return this.error(res, ErrorCode.TutorialNotFound);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetTutorial);
        }
    }

    async deteleTutorialById(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const id = req.params.id;
            const tutorial = await tutorialService.deleteTutorialById(id, userId);
            if (tutorial) return this.ok(res, tutorial);
            return this.error(res, ErrorCode.TutorialNotFound);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetTutorial);
        }
    }
}

module.exports = new TutorialController();