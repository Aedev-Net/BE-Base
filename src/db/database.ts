import mongoose from 'mongoose';
import {appConfig} from '../config/app.config';

class Database {
    async connect(){
        mongoose.Promise = global.Promise;
        const db = await mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
        return db;
    }
}
export default new Database();