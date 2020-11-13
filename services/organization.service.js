const Organization = require('../models/organization.model');
const User = require('../models/user.model');
const validatorHelper = require('../common/helpers/validator.helper');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class OrganizationService {
    async getOrganizations(criteria) {
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        const query = {
            isDeleted: false,
        }
        if (checkedCriteria.search.value) {
            query.name = new RegExp(checkedCriteria.search.value, "i")
        }

        const cntPromise = Organization.find(query).countDocuments();
        const getPromise = Organization.find(query)
            .sort({
                'name': 1
            })
            .lean();
        const usedOrganizationsPromise = User.find({ isDeleted: false })
            .select('organization');

        const [cnt, organization, usedOrganizations] = await Promise.all([cntPromise, getPromise, usedOrganizationsPromise]);
        usedOrganizations.forEach(item => {
            if (!item.organization) return;

            const foundOrganization = organization.find(org => org._id.toString() == item.organization.toString())
            if (foundOrganization) foundOrganization.used = true;
        });
        const rs = organization.splice(checkedCriteria.start, checkedCriteria.length);

        return {
            data: rs,
            recordsTotal: cnt,
            recordsFiltered: cnt,
        }
    }

    async createOrganization(organization, userId) {
        const newOrganization = new Organization(organization);
        const newData = JSON.stringify(organization);
        LogHelper.logAction(userId, Action.CreateOrganization, '', newData);
        return await newOrganization.save();
    }

    async updateOrganization(organization, userId) {
        const oldOrganization = await Organization.findOne({ _id: organization._id, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldOrganization);
        await Organization.updateOne({ _id: organization._id }, organization);
        const newOrganization = await Organization.findOne({ _id: organization._id, isDeleted: false }).lean();
        const newData = JSON.stringify(newOrganization);
        LogHelper.logAction(userId, Action.UpdateOrganization, oldData, newData);
    }

    async getOrganizationById(id) {
        const organization = await Organization.findOne({
            _id: id,
            isDeleted: false,
        });
        return organization;
    }

    async getAllOrganizations() {
        const organizations = await Organization.find({ isDeleted: false }).select('name');
        return organizations;
    }

    async deleteOrganization(id, userId) {
        if (!id) throw new Error(ErrorCode.OrganizationNotFound);

        const organization = await Organization.findById(id);
        if (!organization) throw new Error(ErrorCode.OrganizationNotFound);

        organization.isDeleted = true;
        LogHelper.logAction(userId, Action.DeteteOrganization, id, '');
        await organization.save();
    }

    async changeStatus(id, userId) {
        if (!id) throw new Error(ErrorCode.OrganizationNotFound);

        const organization = await Organization.findOne({ _id: id, isDeleted: false });
        if (!organization) throw new Error(ErrorCode.OrganizationNotFound);

        organization.isActive = !organization.isActive;
        LogHelper.logAction(userId, Action.ChangeStatusOrganization, id, '');
        await organization.save();
    }

    async getOrganizationByName(name) {
        const organization = await Organization.findOne({ isDeleted: false, name });

        return organization;
    }
}

module.exports = new OrganizationService(); 