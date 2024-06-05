'use strict';
const BaseRouter = require('./base.router');
const tutorialController = require('../controllers/tutorial.controller');
const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class TutorialRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', tutorialController.getTutorialsByType, [Right.AdminViewTutorials]);
        this.route(HttpMethod.POST, '', tutorialController.createTutorial, [Right.AdminCreateTutorials]);
        this.route(HttpMethod.PUT, '', tutorialController.updateTutorial, [Right.AdminDeleteTutorials]);
        this.route(HttpMethod.GET, '/:id', tutorialController.getTutorialById, [Right.AdminViewTutorials]);
        this.route(HttpMethod.DELETE, '/:id', tutorialController.deteleTutorialById, [Right.AdminViewTutorials]);
    }
}

module.exports = new TutorialRouter();