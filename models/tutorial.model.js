'use strict';

const BaseModel = require('./base.model');

class Tutorials extends BaseModel {
    init() {
        this.name = 'tutorials';
        this.model = {
            title: String,
            description: String,
            content: String,
            thumbnail: String,
            type: String,
            video: String,
        };
    }
}

module.exports = new Tutorials().instance();