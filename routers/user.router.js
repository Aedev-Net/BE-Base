'use strict';

const BaseRouter = require('./base.router');
const userController = require('../controllers/user.controller');

const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class UserRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', userController.getById, [Right.AdminViewUsers, Right.VqcViewMembers]);
        this.route(HttpMethod.GET, '/admin', userController.getAdmins, [Right.AdminViewUsers]);
        this.route(HttpMethod.GET, '/tool', userController.getUserOfTool, [Right.Basic]);
        this.route(HttpMethod.PUT, '/language', userController.updateLanguage, [Right.Basic]);
        this.route(HttpMethod.PUT, '', userController.updateUser, [Right.AdminUpdateUsers]);
        this.route(HttpMethod.GET, '/list', userController.getUsers, [Right.AdminViewUsers]);
        this.route(HttpMethod.POST, '', userController.createUser, [Right.AdminCreateUsers]);
        this.route(HttpMethod.POST, '/register-org', userController.registerUserAndOrg);
        this.route(HttpMethod.POST, '/register', userController.registerUser);
        this.route(HttpMethod.GET, '/agent-qc', userController.getAgentQCUsers, [Right.VqcViewMembers]);
        this.route(HttpMethod.GET, '/:id', userController.getById, [Right.AdminViewUsers]);
        this.route(HttpMethod.POST, '/status', userController.changeStatus, [Right.AdminDeactivateUsers]);
        this.route(HttpMethod.DELETE, '/:id', userController.deleteUser, [Right.AdminDeleteUsers]);
        this.route(HttpMethod.PUT, '/agent-qc', userController.updateAgentQcUser, [Right.VqcInviteNewMember]);
        this.route(HttpMethod.POST, '/invite', userController.sendInvitationEmail, [Right.VqcInviteNewMember]);
    }
}

module.exports = new UserRouter();