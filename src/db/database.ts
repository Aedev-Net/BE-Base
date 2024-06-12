import {Sequelize} from 'sequelize';
import {appConfig} from '../config/app.config';

const dbConnection = new Sequelize(appConfig.db.database, appConfig.db.user, appConfig.db.password, {
    host: 'localhost',
    dialect: 'mariadb',
    logging: true,
})
export default dbConnection;
