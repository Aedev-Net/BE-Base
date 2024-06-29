import {BaseModel} from "./base.model";
import {DataTypes} from "sequelize";
import EmployeesModel from "./employees.model";


class DepartmentModel extends BaseModel  {
    init() {
        this.name = 'department';
        this.model = {
            name: {
                type: DataTypes.STRING(100),
            }
        };
    }
}
// EmployeesModel.hasMany(DepartmentModel, { foreignKey: 'department_id' });

export default new DepartmentModel().instance();
