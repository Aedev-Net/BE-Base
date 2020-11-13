'use strict';

const BaseController = require('./base.controller');
const nlpEngineService = require('../services/nlp-engine.service');
const ErrorCode = require('../common/enums').ErrorCode;

class NlpEngineController extends BaseController {
    async getNlpEngines(req, res) {
        try {
            const rs = await nlpEngineService.getNlpEngines(req.query, req.headers);
            if (!rs) return this.error(res, ErrorCode.CannotGetNlpEngine);
            rs.success = true;

            return res.json(rs);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async createNlpEngine(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const nlpEngine = await nlpEngineService.createNlpEngine(req.body, userId);
            await nlpEngineService.genTokenForNlpEngine(nlpEngine._id);
            return this.ok(res, nlpEngine);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async getNlpEngineById(req, res) {
        try {
            let rs = await nlpEngineService.getNlpEngineById(req.params.id);
            if (rs) return this.ok(res, rs);
            return this.error(res, ErrorCode.NlpEngineNotFound);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async updateNlpEngine(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await nlpEngineService.updateNlpEngine(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async updateAudioChannel(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const nlpEngineId = req.headers.engineId;
            await nlpEngineService.updateAudioChannel(req.body.isTwoChannels, nlpEngineId, userId);

            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async updateMultiIntents(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const nlpEngineId = req.headers.engineId;
            await nlpEngineService.updateMultiIntents(req.body.isMultiIntents, nlpEngineId, userId, req.headers);

            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async updateConfidentRanges(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const nlpEngineId = req.headers.engineId;
            await nlpEngineService.updateConfidentRanges(req.body.confidentRanges, nlpEngineId, userId, req.headers);

            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async getConfidentRanges(req, res) {
        try {
            const nlpEngineId = req.headers.engineId;
            const confidentRanges = await nlpEngineService.getConfidentRanges(nlpEngineId);

            return confidentRanges ? this.ok(res, confidentRanges) : this.error(res, '', ErrorCode.NlpEngineNotFound);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async deleteNlpEngine(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId || req.headers.userid;
            await nlpEngineService.deleteNlpEngine(req.params.id, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }
}

module.exports = new NlpEngineController();