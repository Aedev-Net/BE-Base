'use strict';
const BaseRouter = require('./base.router');
const nlpEngineController = require('../controllers/nlp-engine.controller');

const { HttpMethod } = require('../common/constants');
const Rights = require('../common/rights');

class NlpEngineRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', nlpEngineController.getNlpEngines, [Rights.AdminViewNlpEngines]);
        this.route(HttpMethod.PUT, '/multi-intents', nlpEngineController.updateMultiIntents, [Rights.Basic]);
        this.route(HttpMethod.PUT, '/confident-ranges', nlpEngineController.updateConfidentRanges, [Rights.VqcViewConfidenceRangeSettings, Rights.BotViewConfidenceRangeSettings]);
        this.route(HttpMethod.GET, '/confident-ranges', nlpEngineController.getConfidentRanges, [Rights.VqcViewConfidenceRangeSettings, Rights.BotViewConfidenceRangeSettings]);
        this.route(HttpMethod.PUT, '/channel-type', nlpEngineController.updateAudioChannel, [Rights.BotViewAudioChannelSettings, Rights.VqcViewAudioChannelSettings]);
        this.route(HttpMethod.GET, '/:id', nlpEngineController.getNlpEngineById, [Rights.AdminViewNlpEngines]);
        this.route(HttpMethod.POST, '', nlpEngineController.createNlpEngine, [Rights.AdminCreateNlpEngines]);
        this.route(HttpMethod.PUT, '', nlpEngineController.updateNlpEngine, [Rights.AdminUpdateNlpEngines, Rights.BotUpdateBot]);
        this.route(HttpMethod.DELETE, '/:id', nlpEngineController.deleteNlpEngine, [Rights.AdminDeleteNlpEngines, Rights.BotDeleteBot]);
    }
}

module.exports = new NlpEngineRouter();