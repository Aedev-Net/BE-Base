import {BaseModel} from "./base.model";
import {DataTypes} from "sequelize";


class AppUserModel extends BaseModel {
    init() {
        this.name = 'user';
        this.model = {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            device_id: {
                type: DataTypes.STRING(100),
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            user_name: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            last_active: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            avatar_url: {
                type: DataTypes.STRING(1000),
            },
            avatar_frame: {
                type: DataTypes.STRING(1000),
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
        };
    }
}

export default new AppUserModel().instance();
