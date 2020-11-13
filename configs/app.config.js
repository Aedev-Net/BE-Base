'use strict';

const appConfig = Object.freeze({
    env: {
        port: process.env.PORT || 4051,
        host: process.env.HOST || 'localhost',
        stage: process.env.NODE_ENV || 'dev',
    },
    root: process.env.AUTH_ROOT || 'http://localhost:4000',
    encryption: {
        password: process.env.ENCRYPTION_PASS || '',
        salt: process.env.ENCRYPTION_SALT || '',
    },
    db: {
        uri: process.env.DB_URI || 'paste your mongodb uri here',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
        }
    },
    serverApiKey: process.env.SERVER_API_KEY || 'api_key',
    remoteServers: {
        nlp: process.env.NLP_ROOT || 'http://localhost:3103',
        common: process.env.COMMON_ROOT || 'http://localhost:3001',
        log: process.env.LOG_ROOT || 'http://localhost:4100',
        tool: process.env.TOOL_ROOT || 'http://localhost:4001',
        livechat: process.env.LIVECHAT_ROOT || 'http://localhost:3001',
    }
});

module.exports = appConfig;