'use strict';
const BaseRouter = require('./base.router');
const roleController = require('../controllers/role.controller');

const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class RoleRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '/rights', roleController.getAllRights, [Right.AdminViewRoles, Right.Basic]);
        this.route(HttpMethod.GET, '', roleController.getRoles, [Right.AdminViewRoles, Right.VqcViewMembers]);
        this.route(HttpMethod.POST, '', roleController.createRole, [Right.AdminCreateRoles]);
        this.route(HttpMethod.PUT, '', roleController.updateRole, [Right.AdminUpdateRoles]);
        this.route(HttpMethod.GET, '/all', roleController.getAllRoles, [Right.AdminViewRoles]);
        this.route(HttpMethod.GET, '/agent-qc', roleController.getAgentQcRoles, [Right.AdminViewRoles, Right.VqcViewMembers]);
        this.route(HttpMethod.GET, '/:id', roleController.getRoleById, [Right.AdminViewRoles]);
    }
}

module.exports = new RoleRouter();