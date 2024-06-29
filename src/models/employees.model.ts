import {BaseModel} from "./base.model";
import {DataTypes} from "sequelize";
import DepartmentModel from "./department.model";


class EmployeesModel extends BaseModel  {
    init() {
        this.name = 'employees';
        this.model = {
            employee_name: {
                type: DataTypes.STRING(255),
            },
            department_id: {
                type: DataTypes.BIGINT(),
                references: {
                    model: DepartmentModel,
                    key: 'department_id'
                }
            }
        };
    }
}
// DepartmentModel.hasMany(EmployeesModel, { foreignKey: 'department_id' });


export default new EmployeesModel().instance();
