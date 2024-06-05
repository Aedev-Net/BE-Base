'use strict';

const BaseModel = require('./base.model');
const { Lang } = require('../common/enums');

class Localization extends BaseModel {
    init() {
        this.name = 'localizations';
        this.model = {
            field: {
                type: String,
                unique: true,
                required: true
            },
            values: [{
                language: {
                    type: Lang,
                    default: Lang.VI
                },
                content: String
            }],
        };
    }
}

module.exports = new Localization().instance();
