import {DataTypes, ModelAttributes, Sequelize} from 'sequelize';
import dbConnection from '../db/database';

export class BaseModel {
    name: string = '';
    model: ModelAttributes = {};

    constructor() {
        this.init();
        this.createSchema();
    }

    init() {
    }

    instance() {
        return dbConnection.define(this.name, this.model, {
            timestamps: false,
            freezeTableName: true,
        });
    }

    createSchema() {
        const commonFields = {
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
        };
        const idField = {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
        };
        this.model = Object.assign(idField, this.model, commonFields);
    }
}
