'use strict';

const mongoose = require('mongoose');
const BaseModel = require('./base.model');
const { NlpStatus, DefaultConfidentRange } = require('../common/constants');

const Schema = mongoose.Schema;

class NlpModel extends BaseModel {
    init() {
        this.name = 'nlp-engines';
        this.model = {
            name: String,
            organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
            status: { type: Number, default: NlpStatus.Idle },
            appId: String,
            appSecret: String,
            appToken: String,
            webhook: String,
            isTwoChannels: Boolean,
            isMultiIntents: { type: Boolean, default: true },
            confidentRanges: {
                goodFrom: { type: Number, default: DefaultConfidentRange.GoodFrom },
                warningFrom: { type: Number, default: DefaultConfidentRange.WarningFrom },
            },
            sttServer: String,
        };
    }
}

module.exports = new NlpModel().instance();
