'use strict';

const BaseModel = require('./base.model');

class Role extends BaseModel {
    init() {
        this.name = 'roles';
        this.model = {
            name: {
                type: String,
                require: true,
            },
            description: String,
            rights: [Number],
        };
    }
}

module.exports = new Role().instance();
