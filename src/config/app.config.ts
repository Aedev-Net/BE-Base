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
        uri: process.env.DB_URI || 'mongodb+srv://admin:qgukiMq6rVnwjhl0@dataapp.sdzp7.gcp.mongodb.net/anime_movie?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }
    },
    serverApiKey: process.env.SERVER_API_KEY || 'api_key',
    remoteServers: {
        nlp: process.env.NLP_ROOT || '',
        common: process.env.COMMON_ROOT || '',
        log: process.env.LOG_ROOT || '',
        tool: process.env.TOOL_ROOT || '',
    }
})
