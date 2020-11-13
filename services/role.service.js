const Right = require('../common/rights');
const Role = require('../models/role.model');
const validatorHelper = require('../common/helpers/validator.helper');
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');
const { Roles, Apps } = require('../common/enums');
const _ = require('lodash');

class RoleService {
    getAllRights() {
        const rights = Object.values(Right);

        return rights;
    }

    getVqcRights() {
        const rights = Object.values(Right)
            .filter(r => r.App == Apps.Basic || r.App == Apps.VirtualQC)
            .map(r => r.Code);
        return rights;
    }

    async getRoles(criteria) {
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        const query = {
            isDeleted: false,
        };

        if (checkedCriteria.search.value) {
            query.name = new RegExp(checkedCriteria.search.value, "i");
        }

        const cntPromise = Role.find(query).countDocuments();
        const getPromise = Role.find(query)
            .sort({
                'name': 1
            })
            .skip(checkedCriteria.start)
            .limit(checkedCriteria.length);
        const [cnt, roles] = await Promise.all([cntPromise, getPromise]);

        return {
            data: roles,
            recordsTotal: cnt,
            recordsFiltered: cnt,
        };
    }

    async createRole(role, userId) {
        const newRole = new Role(role);
        const newData = JSON.stringify(role);
        LogHelper.logAction(userId, Action.CreateRole, '', newData);
        await newRole.save();
    }

    async updateRole(role, userId) {
        const oldRole = await Role.findOne({ _id: role._id, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldRole);
        await Role.updateOne({ _id: role._id }, role);
        const newRole = await Role.findOne({ _id: role._id, isDeleted: false }).lean();
        const newData = JSON.stringify(newRole);
        LogHelper.logAction(userId, Action.UpdateRole, oldData, newData);
    }

    async getRoleById(id) {
        const role = await Role.findOne({
            _id: id,
            isDeleted: false,
        });
        return role;
    }

    async getAllRoles() {
        const roles = await Role.find({ isDeleted: false }).select('name');
        return roles;
    }

    async getAgentQcRoles() {
        const roles = await Role.find(
            {
                isDeleted: false,
                isActive: true,
            },
        ).lean();

        if (!roles || roles.length == 0) return [];
        const vqcRights = this.getVqcRights();
        const vqcRoles = roles.filter(r => {
            return this.isInVqcRight(vqcRights, r.rights);
        });
        return vqcRoles;
    }

    async getRoleByOrgAdmin() {
        const option = {
            isDeleted: false,
            name: Roles.OrganizationAdmin,
            isActive: true,
        };
        let role = await Role.findOne(option).lean();
        if (role) return role._id;
        const rights = Object.values(Right)
            .filter(r => r.App == Apps.Basic || r.App == Apps.VirtualAgent || r.App == Apps.VirtualQC || r.App == Apps.Labelbox || r.App == Apps.Livechat)
            .map(r => r.Code);
        const data = {
            name: Roles.OrganizationAdmin,
            description: "Có quyền truy cập đến tất cả các tính năng của hệ thống (bao gồm VA ,VQC ,LC ,LB)",
            rights: rights,
        };
        role = await Role.create(data);
        return role._id;
    }

    async getRoleByRight(right) {
        const roles = await Role.find({
            isDeleted: false,
            rights: right,
        }).select('name');

        if (!roles || roles.length == 0) return [];

        return roles;
    }

    isInVqcRight(vqcRights, roleRights) {
        return !roleRights.some(code => vqcRights.indexOf(code) === -1);
    }
}

module.exports = new RoleService();