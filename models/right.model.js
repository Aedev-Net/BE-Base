'use strict';

const BaseModel = require('./base.model');

class Right extends BaseModel {
    init() {
        this.name = 'rights';
        this.model = {
            code: {
                type: Number,
                require: true,
            },
            name: {
                type: String,
                require: true,
            },
            description: String,
            module: {
                type: String,
                require: true,
            },
        };
    }
}

module.exports = new Right().instance();
