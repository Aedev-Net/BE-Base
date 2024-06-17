import {Sequelize} from 'sequelize';
const region = Intl.DateTimeFormat();
import {appConfig} from '../config/app.config';

const dbConnection = new Sequelize(appConfig.db.database, appConfig.db.user, appConfig.db.password, {
    host: appConfig.db.host,
    dialect: 'mariadb',
    sync: {force: true},
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: region.resolvedOptions().timeZone,
    logging: appConfig.env.stage === 'prod',
})
export default dbConnection;
