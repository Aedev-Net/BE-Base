const { NlpEngine } = require('../models');
const validatorHelper = require('../common/helpers/validator.helper');
const httpHelper = require('../common/helpers/http.helper');
const { UniqueHelper } = require('../common/helpers');
const appConfig = require('../configs/app.config');
const ErrorCode = require('../common/enums').ErrorCode;
const DockerStatus = require('../common/constants').DockerStatus;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');
const authService = require('../services/auth.service');
const _ = require('lodash');
class NlpEngineService {
    async getNlpEngines(criteria, headers) {
        const url = `${appConfig.remoteServers.nlp}/api/v1/status-trainings/getByAdmin?status=0`;
        const rs = await httpHelper.get(url, headers);
        const enginesInProgress = rs['success'] ? rs['data'] : [];
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        let query;
        const orgFilter = _.get(criteria, 'columns[3].search.value', '');
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

        if (checkedCriteria.search.value) {
            query.name = new RegExp(checkedCriteria.search.value, "i");
        }

        const countNlpEnginesPromise = NlpEngine.find(query).countDocuments();
        const getNlpEnginesPromise = NlpEngine.find(query)
            .select('name organization')
            .sort({
                'name': 1
            })
            .populate('organization', 'name')
            .skip(checkedCriteria.start)
            .limit(checkedCriteria.length)
            .lean();

        const [recordsTotal, nlpEngines] = await Promise.all([countNlpEnginesPromise, getNlpEnginesPromise]);
        enginesInProgress.forEach(ep => {
            const nlpEngine = nlpEngines.find(ne => ne._id == ep.engineId);
            if (nlpEngine) nlpEngine.isTraining = true;
        });

        return {
            data: nlpEngines,
            recordsTotal,
            recordsFiltered: recordsTotal,
        };
    }

    async createNlpEngine(engine, userId) {
        const newNlpEngine = new NlpEngine(engine);
        const newData = JSON.stringify(engine);
        LogHelper.logAction(userId, Action.CreateNLPEngine, '', newData);
        return await newNlpEngine.save();
    }

    async genTokenForNlpEngine(id) {
        const engine = await NlpEngine.findById(id);
        engine.appId = UniqueHelper.generateAppId();
        engine.appSecret = UniqueHelper.generateAppSecret();
        const appToken = await authService.getAppTokenByEngineId(id);
        engine.appToken = appToken && appToken.token;
        return await engine.save();
    }

    async updateNlpEngine(nlpEngine, userId) {
        const oldnlpEngine = await NlpEngine.findOne({ _id: nlpEngine._id, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldnlpEngine);
        await NlpEngine.updateOne({ _id: nlpEngine._id }, nlpEngine);
        const newnlpEngine = await NlpEngine.findOne({ _id: nlpEngine._id, isDeleted: false }).lean();
        const newData = JSON.stringify(newnlpEngine);

        LogHelper.logAction(userId, Action.UpdateNLPEngine, oldData, newData);

    }

    async updateAudioChannel(isTwoChannels, nlpEngineId, userId) {
        const oldNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldNlpEngine);
        await NlpEngine.updateOne({ _id: nlpEngineId }, { isTwoChannels: isTwoChannels });
        const newNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const newData = JSON.stringify(newNlpEngine);

        LogHelper.logAction(userId, Action.UpdateNLPEngine, oldData, newData);
    }

    async updateMultiIntents(isMultiIntents, nlpEngineId, userId, headers) {
        const oldNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldNlpEngine);
        await NlpEngine.updateOne({ _id: nlpEngineId }, { isMultiIntents });
        const newNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const newData = JSON.stringify(newNlpEngine);

        const url = `${process.env.NLP_ROOT}/bots/multi-intents`;
        await httpHelper.put(url, { isMultiIntents }, headers);

        LogHelper.logAction(userId, Action.UpdateNLPEngine, oldData, newData);
    }

    async updateConfidentRanges(confidentRanges, nlpEngineId, userId, headers) {
        const oldNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldNlpEngine);
        await NlpEngine.updateOne({ _id: nlpEngineId }, { confidentRanges });
        const newNlpEngine = await NlpEngine.findOne({ _id: nlpEngineId, isDeleted: false }).lean();
        const newData = JSON.stringify(newNlpEngine);

        const url = `${process.env.NLP_ROOT}/bots/confident-ranges`;
        await httpHelper.put(url, { confidentRanges }, headers);

        LogHelper.logAction(userId, Action.UpdateNLPEngine, oldData, newData);
    }

    async getConfidentRanges(id) {
        const nlpEngine = await NlpEngine.findOne(
            {
                _id: id,
                isDeleted: false,
            },
            {
                confidentRanges: 1
            },
        );
        return nlpEngine && nlpEngine.confidentRanges;
    }

    async getNlpEngineById(id) {
        const nlpEngine = await NlpEngine.findOne({
            _id: id,
            isDeleted: false,
        });
        return nlpEngine;
    }

    async deleteNlpEngine(id, userId) {
        if (!id) throw new Error(ErrorCode.NlpEngineNotFound);

        const nlpEngine = await NlpEngine.findOne({ _id: id, isDeleted: false });

        if (!nlpEngine) throw new Error(ErrorCode.NlpEngineNotFound);

        const url = `${appConfig.remoteServers.nlp}/api/docker/status/${id}`
        const rs = await httpHelper.get(url);
        const status = rs && rs.success ? rs.data : null;
        if (status && status.dockerstatus && status.dockerstatus != DockerStatus.NotFound) throw new Error(ErrorCode.CannotDeleteNlpEngine);

        nlpEngine.isDeleted = true;
        LogHelper.logAction(userId, Action.DeleteNLPEngine, id, '');
        await nlpEngine.save();
    }
}

module.exports = new NlpEngineService();