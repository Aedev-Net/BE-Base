'use strict';

const appConfig = require('./app.config');
const remoteServers = appConfig.remoteServers;

const serviceConfigs = Object.freeze({
    routers: [
        {
            path: '/v1/nlp/test',
            host: remoteServers.nlp,
        },
        {
            path: '/v1/intents',
            host: remoteServers.nlp,
        },
        {
            path: '/v1/entity-types',
            host: remoteServers.nlp,
            methods: ['GET'],
            rights: [200, 201]
        },
        {
            path: 'api/v1/intents',
            host: remoteServers.nlp,
            methods: ['GET'],
            rights: [100]
        },
        {
            path: '/v1/spam',
            host: remoteServers.nlp,
        },
        {
            path: 'api/docker',
            host: remoteServers.nlp,
        },
    ],
});

module.exports = serviceConfigs;