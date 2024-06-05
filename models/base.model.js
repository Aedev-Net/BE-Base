'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class BaseModel {
    constructor() {
        this.init();
        this.createSchema();
    }

    instance() {
        return mongoose.model(this.name);
    }

    createSchema() {
        const commonFields = {
            isActive: {
                type: Boolean,
                require: true,
                default: true
            },
            isDeleted: {
                type: Boolean,
                require: true,
                default: false
            },
            createdAt: Date,
            createdBy: Schema.Types.ObjectId,
            updatedAt: Date,
            updatedBy: Schema.Types.ObjectId,
        }
        this.model = Object.assign(this.model, commonFields);
        this.schema = new Schema(this.model, { collection: this.name, timestamps: true });

        if (typeof this.virtual === 'function') {
            this.virtual();
        }

        mongoose.model(this.name, this.schema);
    }
}

module.exports = BaseModel;
