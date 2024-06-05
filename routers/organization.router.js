'use strict';
const BaseRouter = require('./base.router');
const organizationController = require('../controllers/organization.controller');

const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class LocalizationRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', organizationController.getOrganizations, [Right.AdminViewOrganizations]);
        this.route(HttpMethod.GET, '/all', organizationController.getAllOrganizations, [Right.AdminViewOrganizations]);
        this.route(HttpMethod.GET, '/:id', organizationController.getOrganizationById, [Right.AdminViewOrganizations]);
        this.route(HttpMethod.POST, '', organizationController.createOrganization, [Right.AdminCreateOrganizations]);
        this.route(HttpMethod.PUT, '', organizationController.updateOrganization, [Right.AdminUpdateOrganizations]);
        this.route(HttpMethod.DELETE, '/:id', organizationController.deleteOrganization, [Right.AdminDeleteOrganizations]);
        this.route(HttpMethod.POST, '/status', organizationController.changeStatusOrganization, [Right.AdminActivateOrganizations]);
    }
}

module.exports = new LocalizationRouter();