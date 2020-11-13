'use strict';
const { remoteServers, serverApiKey } = require('../../configs/app.config');
const httpHelper = require('../../common/helpers/http.helper');
const { Server } = require('../../common/constants');
class LogHelper {
    async logAction(userId, action, oldData, newData) {
        try {
            const url = `${remoteServers.log}/logs/actions`;
            const data = {
                userId: userId,
                action: action,
                server: Server.ServerAuth,
                oldData: oldData || '',
                newData: newData || '',
            };
            const options = {
                headers: {
                    authorization: serverApiKey,
                },
            };
            const resData = await httpHelper.post(url, data, options);
            if (!resData) return;
            return resData;
        } catch (error) {
            console.error(error);
        }
    }

    async logAgentQc(userId, action, data, aeId) {
        try {
            const url = `${remoteServers.log}/logs/agent-qc`;
            const body = {
                userId: userId,
                action: action,
                server: Server.ServerAuth,
                data: data || '',
                aeId: aeId || '',
            };
            const options = {
                headers: {
                    authorization: serverApiKey,
                },
            };
            const resData = await httpHelper.post(url, body, options);
            if (!resData) return;
            return resData;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new LogHelper();