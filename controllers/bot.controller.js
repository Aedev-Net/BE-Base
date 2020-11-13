'use strict';

const axios = require('axios');
const BaseController = require('./base.controller');
const { remoteServers, serverApiKey } = require('../configs/app.config');

function getIntent(data) {
    if (!data || !data.intent || data.intent.length == 0) return 'other';

    return data.intent[0].value;
}

function getEntities(data) {
    const entities = {};
    if (!data || !data.entities) return entities;

    Object.keys(data.entities).forEach(name => {
        if (name == 'sys') return;

        const value = getEntityValue(data.entities[name]);
        if (value) entities[name] = value;
    });

    const phone = getPhone(data.entities.sys);
    if (phone) entities.phone = phone;

    return entities;
}

function getPhone(sys) {
    if (!sys || !sys.phone_number || sys.phone_number.length == 0) return;

    return sys.phone_number[0];
}

function getEntityValue(entity) {
    if (!entity || entity.length == 0 || !entity[0]) return;
    return entity[0].keyword || entity[0].value;
}

async function getNlpResult(text, orgId) {
    const url = `${remoteServers.nlp}/v1/nlp/test?text=${encodeURIComponent(text)}`;
    const options = {
        headers: {
            authorization: serverApiKey,
            orgId: orgId,
        }
    }
    const nlpData = await axios.get(url, options);
    if (!nlpData || !nlpData.data || !nlpData.data.data) return;

    return nlpData.data.data;
}

async function getUserById(userId) {
    const url = `${remoteServers.nlp}/api/v1/fe-credits/${userId}`;
    const options = {
        headers: {
            authorization: serverApiKey,
        }
    }
    const res = await axios.get(url, options);
    if (!res || !res.data || !res.data.data) return;

    return res.data.data;
}

class BotController extends BaseController {
    async getNlp(req, res) {
        try {
            console.log(req.body);
            const nlpData = await getNlpResult(req.body.conversation.userResponses.latest_response, req.headers.orgId);
            const intent = getIntent(nlpData);
            const entities = getEntities(nlpData);
            const resData = {
                intent,
                entities,
                userId: req.body.userId,
            };
            console.log(resData);
            res.json(resData);
        } catch (err) {
            console.error(err);
            res.json(false);
        }
    }

    async getUserById(req, res) {
        try {
            console.log(req.body);
            const user = await getUserById(req.body.userId);

            res.json({
                userId: req.body.userId,
                user
            });
        } catch (err) {
            console.error(err);
            res.json(false);
        }
    }
}

module.exports = new BotController();