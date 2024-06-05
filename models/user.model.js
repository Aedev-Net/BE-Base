'use strict';

const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const { Lang } = require('../common/enums');

const Schema = mongoose.Schema;

class User extends BaseModel {
    init() {
        this.name = 'users';
        this.model = {
            name: {
                type: String,
                require: true,
            },
            username: {
                type: String,
                require: true,
            },
            password: {
                type: String,
                require: true,
            },
            email: String,
            phone: String,
            address: String,
            role: { type: Schema.Types.ObjectId, ref: 'roles' },
            lang: {
                type: Lang,
                default: Lang.VI,
            },
            avatar: String,
            organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
            isChangedPassword: { type: Boolean, default: false },
        };
    }
}

module.exports = new User().instance();
