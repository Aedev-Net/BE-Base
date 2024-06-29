import {BaseRouter} from './base.router';
import {HttpMethod} from '../common/constants';
import CreateUserController from "../controllers/createuser.controller";

class CreateUserRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.POST, '/create', CreateUserController.createUser)
        this.route(HttpMethod.GET, '/employee', CreateUserController.getData)

    }
}

export default new CreateUserRouter();
