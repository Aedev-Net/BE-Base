'use strict';

const BaseController = require('./base.controller');
const organizationService = require('../services/organization.service');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class OrganizationController extends BaseController {
    async getOrganizations(req, res) {
        try {
            const rs = await organizationService.getOrganizations(req.query);
            if (rs) {
                return res.json({
                    draw: rs.draw,
                    success: true,
                    data: rs.data,
                    recordsTotal: rs.recordsTotal,
                    recordsFiltered: rs.recordsFiltered
                });
            }

            return this.error(res, ErrorCode.CannotGetOganization);
        } catch (error) {
            console.log(error);
            return this.error(res, ErrorCode.CannotGetOganization);
        }
    }

    async createOrganization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await organizationService.createOrganization(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotCreateOganization);
        }
    }

    async updateOrganization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await organizationService.updateOrganization(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotUpdateOganization);
        }
    }

    async getOrganizationById(req, res) {
        try {
            const organization = await organizationService.getOrganizationById(req.params.id);
            if (organization) return this.ok(res, organization);
            return this.error(res, ErrorCode.OrganizationNotFound);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetOganization);
        }
    }

    async getAllOrganizations(req, res) {
        try {
            const roles = await organizationService.getAllOrganizations();
            return this.ok(res, roles);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetOganization);
        }
    }

    async deleteOrganization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await organizationService.deleteOrganization(req.params.id, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotDeleteOganization);
        }
    }

    async changeStatusOrganization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await organizationService.changeStatus(req.body.userId, userId);
            return this.ok(res, '');
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotChangeStatus);
        }
    }
}

module.exports = new OrganizationController();