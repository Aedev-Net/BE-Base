const BaseService = require('./base.service');
const User = require('../models/user.model');
const Organization = require('../models/organization.model');
const { ErrorCode } = require('../common/enums');
const passwordHelper = require('../common/helpers/password.helper');
const mailHelper = require('../common/helpers/mail.helper');
const validatorHelper = require('../common/helpers/validator.helper');
const organizationService = require('./organization.service');
const Constants = require('../common/constants');
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');
const roleService = require('./role.service');
const { JwtHelper } = require('../common/helpers');
const Right = require('../common/rights');
const mongoose = require('mongoose');

class UserService extends BaseService {
    getAll() {

    }

    getMany() {

    }

    async getById(id, field = '') {
        const user = await User.findById(id).select(field).lean();
        if (!user) throw new Error('User not found!');
        if (user.organization) {
            const org = await this.getOrganizationById(user.organization);
            user.org = org;
        }
        return user;
    }

    async getByUserName(username) {
        const user = await User.findOne({
            username: username,
            isActive: true,
            isDeleted: false,
        }).lean();
        return user;
    }

    async getUserById(id) {
        const user = await User.findOne({ _id: id, isDeleted: false }).lean();
        return user;
    }

    async getByEmail(email) {
        const user = await User.findOne({
            email: email,
            isActive: true,
            isDeleted: false,
        }).lean();
        return user;
    }

    async getOrganizationById(id) {
        if (!id) return;
        const org = await Organization.findOne({
            _id: id,
            isActive: true,
            isDeleted: false,
        }).lean();
        return org;
    }

    getOne() {

    }

    async createUser(data, userId) {
        const user = new User();
        data.password = data.password || 'vnlp@123';
        const encryptedPassword = passwordHelper.hash(data.username, data.password);
        user.name = data.name;
        user.username = data.username;
        user.password = encryptedPassword;
        user.address = data.address;
        user.role = data.role;
        user.email = data.email;
        user.phone = data.phone;
        user.organization = data.organization;
        LogHelper.logAction(userId, Action.CreateUser, '', user);
        await user.save();
        mailHelper.createUser(data.email, data.password);
    }

    async createUserWithToken(data) {
        let user = new User();
        const tokenData = JwtHelper.verifyToken(data.token);

        if (!tokenData) throw new Error(ErrorCode.TokenIsInvalid);
        data.password = data.password || 'vnlp@123';
        const encryptedPassword = passwordHelper.hash(data.username, data.password);

        user.name = data.name;
        user.username = data.username;
        user.password = encryptedPassword;
        user.address = data.address;
        user.phone = data.phone;
        user.organization = tokenData.organization;
        user.role = tokenData.role;
        user.email = tokenData.email;
        await user.save();
        LogHelper.logAction(user._id, Action.CreateUser, '', user);
        mailHelper.createUser(tokenData.email, data.password);
    }

    async registerUserAndOrg(data) {
        let organization = await organizationService.getOrganizationByName(data && data.organizationName)
        if (organization) throw new Error(ErrorCode.OrganizationIsExisting);
        const org = {
            name: data && data.organizationName,
            address: data && data.address || '',
            phone: data && data.phone || '',
        };
        data.password = data.password || 'vnlp@123';
        let user = new User(data);
        user._id = mongoose.Types.ObjectId();
        organization = await organizationService.createOrganization(org, user._id);
        user.password = passwordHelper.hash(data.username, data.password);;
        user.organization = organization && organization._id;
        user.role = await roleService.getRoleByOrgAdmin();
        user.isChangedPassword = true;
        return await user.save();
    }

    async updateUser(data, userId) {
        if (data.password) {
            const newEncryptPassword = passwordHelper.hash(data.username, data.password);
            data.password = newEncryptPassword;
        }
        const oldUser = await User.findOne({ _id: data._id, isDeleted: false }).lean();
        const oldData = JSON.stringify(oldUser);
        await User.updateOne({ _id: data._id }, data);
        const newUser = await User.findOne({ _id: data._id, isDeleted: false }).lean();
        const newData = JSON.stringify(newUser);
        LogHelper.logAction(userId, Action.UpdateUser, oldData, newData);
    }

    async delete(id) {
        if (!id) return this.error(ErrorCode.UserDoesNotExists);

        const user = await User.findById(id);
        if (!user) return this.error(ErrorCode.UserDoesNotExists);

        user.isDeleted = true;
        user.save();
    }

    async getUsers(criteria) {
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        // get value filter from columns of datatable instance
        const textOrganization = checkedCriteria.columns[4].search.value;
        // get value searching from textinput searching of datatable instance
        const textSearching = checkedCriteria.search.value;
        // Default query configuration
        const defaultQuery = {
            $and: [
                {
                    isDeleted: false,
                }
            ]
        };
        //format combination of searching and filter components
        const query = await this.formatQueryCombinedSearchAndFilter(defaultQuery, textOrganization, textSearching);
        const cntPromise = User.find(query).countDocuments();
        const getPromise = User.find(query)
            .sort({
                'name': criteria['order'] ? criteria['order'][0]['dir'] : 1
            })
            .populate('organization role', 'name')
            .skip(checkedCriteria.start)
            .limit(checkedCriteria.length)
            .lean(true);
        const [cnt, users] = await Promise.all([cntPromise, getPromise]);
        return {
            data: users,
            recordsTotal: cnt,
            recordsFiltered: cnt,
        }
    }

    async changeStatus(id, userId) {
        if (!id) throw new Error(ErrorCode.UserIsNotFound);

        const user = await User.findOne({ _id: id, isDeleted: false });
        if (!user) throw new Error(ErrorCode.UserIsNotFound);

        user.isActive = !user.isActive;
        LogHelper.logAction(userId, Action.ChangeStatusUser, id, '');
        await user.save();
    }

    async deleteUser(id, userId) {
        if (!id) throw new ErrorCode(ErrorCode.UserIsNotFound);

        const user = await User.findById(id);
        if (!user) throw new ErrorCode(ErrorCode.UserIsNotFound);

        user.isDeleted = true;
        LogHelper.logAction(userId, Action.DeleteUser, id, '');
        await user.save();
    }

    async getAdmins() {
        const organization = await organizationService.getOrganizationByName(Constants.Organization.System);
        if (!organization) return;

        const admins = await User.find({
            isDeleted: false,
            organization: organization._id,
        });
        return admins;
    }

    async getUserOfTools(orgId) {
        if (!orgId) throw new Error(ErrorCode.DataNotFound);

        const roles = await roleService.getRoleByRight(Right.LabelboxUploadAudios.Code);
        const query = {
            isDeleted: false,
            organization: orgId,
            $or: [],
        };
        roles.forEach(r => {
            query.$or.push(
                {
                    role: r._id,
                }
            )
        });
        const users = await User.find(query).lean();

        return users;

    }

    async updateLanguage(lang, userId) {
        const user = await User.findById(userId);
        if (!user) return;
        user.lang = lang;
        await user.save();
    }

    async getAgentQCUsersByOrgId(orgId) {
        let roles = await roleService.getAgentQcRoles();

        roles = roles.map(r => r._id);
        if (!roles || roles.length == 0) return [];

        let users = await User.find({
            isDeleted: false,
            organization: orgId,
        }).populate('role', 'name').select('username role').lean();
        users = users.filter(u => {
            if (!u || !u.role || !u.role.name) return false;

            if (u.role.name == Constants.Role.Admin) return true;

            const agentQcRole = roles.find(r => r == u.role._id.toString());
            if (agentQcRole) return true;

            return false;
        })

        return users;
    }

    async updateAgentQcUser(data, orgId, userId) {
        if (!data || !orgId) throw new Error('Can not update user');

        let user = await User.findOne({
            _id: data._id,
            organization: orgId,
        });

        if (!user) throw new Error('User not Found');

        user = Object.assign(user, data);
        LogHelper.logAgentQc(userId, Action.SentInviteEmail);
        await user.save();
    }

    async sendUserInvitation(user, domain, userId) {
        if (!user || !domain || !userId) return;
        const data = {
            email: user.email,
            role: user.role,
            organization: user.orgId,
        };
        const options = {
            expiresIn: 15 * 60,
        };
        const userByEmail = await this.getByEmail(user.email);
        if (userByEmail) throw new Error(ErrorCode.EmailIsExisting);
        const organization = await organizationService.getOrganizationById(user.orgId)
        const role = await roleService.getRoleById(user.role);
        const inviter = await this.getUserById(userId);
        if (!organization || !role || !inviter) return;
        data.organizationName = organization.name;
        const token = JwtHelper.generateToken(data, options);
        LogHelper.logAgentQc(userId, Action.SentInviteEmail);
        const mailInfo = {
            email: user.email,
            domain,
            token,
            expiredTime: options.expiresIn,
            organizationName: organization.name,
            roleName: role.name,
            name: inviter.name,
        };
        await mailHelper.sendUserInvitation(mailInfo);
        return { success: true };
    }

    /**
     * formatQueryCombinedSearchAndFilter() returns a new query for User Model
     * based on the passed-in 3 params: defaultQuery,textOrganization,textSearching
     */
    async formatQueryCombinedSearchAndFilter(
        query,
        textOrganization = '',
        textSearching = '',
    ) {
        // init variable
        let origanizationId = '';

        if (textOrganization !== '') {
            const queryOrganizationIdMatch = {
                name: new RegExp(textOrganization, "i"),
            };

            //find organization id with text organization id
            const organizationIdMatch = await Organization.findOne(queryOrganizationIdMatch);
            origanizationId = organizationIdMatch !== null ? organizationIdMatch._id : '';
        }

        if (textSearching !== '') {
            if (textOrganization !== '') {
                query.$and.push(
                    {
                        organization: {
                            _id: origanizationId,
                        },
                    },
                    {
                        $or: [
                            {
                                name: new RegExp(textSearching, "i"),
                            },
                            {
                                username: new RegExp(textSearching, "i"),
                            },
                        ],
                    },
                );

                return query;
            } else {
                query.$and.push(
                    {
                        $or: [
                            {
                                name: new RegExp(textSearching, "i"),
                            },
                            {
                                username: new RegExp(textSearching, "i"),
                            },
                        ],
                    },
                );

                return query;
            }
        }

        if (origanizationId !== '') {
            if (textSearching !== '') {
                query.$and.push(
                    {
                        organization: {
                            _id: origanizationId,
                        },
                    },
                    {
                        $or: [
                            {
                                name: new RegExp(textSearching, "i"),
                            },
                            {
                                username: new RegExp(textSearching, "i"),
                            },
                        ],
                    },
                );

                return query;
            } else {
                query.$and.push(
                    {
                        organization: {
                            _id: origanizationId,
                        },
                    },
                );

                return query;
            }
        }

        return query;
    }
}

module.exports = new UserService();