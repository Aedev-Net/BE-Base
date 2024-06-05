'use strict';

const mongoose = require('mongoose');
const BaseModel = require('./base.model');

const Schema = mongoose.Schema;

class Token extends BaseModel {
    init() {
        this.name = 'tokens';
        this.model = {
            user: Schema.Types.ObjectId,
            username: String,
            organization: Schema.Types.ObjectId,
            organizationName: String,
            tokenId: String,
            token: String,
            expiredTime: Date,
        };
    }
}

module.exports = new Token().instance();
