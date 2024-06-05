'use strict';
const BaseModel = require('./base.model');

class FeedbackOption extends BaseModel {
    init() {
        this.name = 'feedback-option';
        this.model = {
            name: String,
        };
    }
}

module.exports = new FeedbackOption().instance();