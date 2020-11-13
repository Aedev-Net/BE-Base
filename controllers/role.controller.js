'use strict';

const BaseController = require('./base.controller');
const roleService = require('../services/role.service');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class RoleController extends BaseController {
    async getAllRights(req, res) {
        try {
            const rs = await roleService.getAllRights();
            return this.ok(res, rs);
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotGetRights);
        }
    }

    async getRoles(req, res) {
        try {
            const rs = await roleService.getRoles(req.query);
            return res.json({
                draw: rs.draw,
                success: true,
                data: rs.data,
                recordsTotal: rs.recordsTotal,
                recordsFiltered: rs.recordsFiltered
            });
        } catch (err) {
            console.error(err);
            return this.error(res, ErrorCode.CannotGetRole);
        }
    }

    async createRole(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await roleService.createRole(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotCreateRole);
        }
    }

    async updateRole(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await roleService.updateRole(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotUpdateRole);
        }
    }

    async getRoleById(req, res) {
        try {
            const role = await roleService.getRoleById(req.params.id);
            if (role) return this.ok(res, role);
            return this.error(res, ErrorCode.RoleNotFound);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetRole);
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            return this.ok(res, roles);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetRole);
        }
    }

    async getAgentQcRoles(req, res) {
        try {
            const roles = await roleService.getAgentQcRoles();

            return this.ok(res, roles);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetRole);
        }
    }
}

module.exports = new RoleController();