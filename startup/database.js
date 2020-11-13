'use strict';

const mongoose = require('mongoose');
const appConfig = require('../configs/app.config');

class Database {
    async connect() {
        mongoose.Promise = global.Promise;
        const db = await mongoose.connect(appConfig.db.uri, appConfig.db.options);
        console.log('Connected to database!');
        return db;
    };
}

module.exports = new Database();