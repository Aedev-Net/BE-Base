import dotenv from 'dotenv';
dotenv.config();

const getENVFile = () => {
    let envFile = ENV.dev;
    const nodeENV = process.env.NODE_ENV;
    switch (nodeENV) {
        case 'PROD':
            envFile = ENV.prod;
            break;
        case 'DEV':
            envFile = ENV.dev;
            break;
        case 'LOCAL':
            envFile = ENV.local;
            break;
        default:
            envFile = ENV.local;
    }
    return envFile;
};
const ENV = {
    prod: 'production',
    dev: 'development',
    stag: 'staging',
    local: 'local',
};

dotenv.config({path: __dirname + '/../env/.env.' + getENVFile()});
export const appConfig = Object.freeze({
    env: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        stage: process.env.NODE_ENV || 'dev'
    },
    root: process.env.AUTH_ROOT || '',
    encryption: {
        password: process.env.ENCRYPTION_PASS || '',
        salt: process.env.ENCRYPTION_SALT
    },
    db: {
        connectionLimit: 10,
        host: '45.76.147.169',
        user: process.env.USERNAME1,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        charset: 'utf8mb4',
    },
    serverApiKey: process.env.SERVER_API_KEY || 'api_key',
    remoteServers: {
        nlp: process.env.NLP_ROOT || '',
        common: process.env.COMMON_ROOT || '',
        log: process.env.LOG_ROOT || '',
        tool: process.env.TOOL_ROOT || '',
    }
})
