'use strict';
const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const Schema = mongoose.Schema;
const { FeedbackStatus } = require('../common/constants');

class Feedback extends BaseModel {
    init() {
        this.name = 'user-feedback';
        this.model = {
            comment: {
                type: String,
                require: true,
            },
            rate: {
                type: Number,
            },
            option: {
                type: Schema.Types.ObjectId, ref: 'feedback-option',
            },
            user: {
                type: Schema.Types.ObjectId, ref: 'users',
            },
            isVerify: {
                type: Boolean,
                default: FeedbackStatus.Unverified,
            },
            organization: { type: Schema.Types.ObjectId, ref: 'organizations', },
        };
    }
}

module.exports = new Feedback().instance();