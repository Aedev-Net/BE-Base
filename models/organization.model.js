'use strict';

const BaseModel = require('./base.model');

class Organization extends BaseModel {
    init() {
        this.name = 'organizations';
        this.model = {
            name: String,
            description: String,
            address: String,
            email: String,
            phone: String,
        };
    }
}

module.exports = new Organization().instance();
