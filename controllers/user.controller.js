const userService = require('../services/user.service');
const BaseController = require('./base.controller');
const enums = require('../common/enums');
const HttpCode = enums.HttpCode;
const ErrorCode = enums.ErrorCode

class UserController extends BaseController {
    async getById(req, res) {
        try {
            const userId = req.params.id || req.headers.userId;
            const field = req.query.field ? req.query.field : '-password';
            const user = await userService.getById(userId, field);
            this.ok(res, user);
        } catch (err) {
            if (err) {
                console.error(err);
                return this.error(res, err.statusCode, err.message);
            }
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            const user = await userService.updateUser(req.body.providerInf, userId);
            this.ok(res, user);
        } catch (err) {
            if (err) {
                console.error(err);
                return this.error(res, err.statusCode, err.message);
            }
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async getUsers(req, res) {
        try {
            const rs = await userService.getUsers(req.query);
            if (rs) {
                return res.json({
                    draw: rs.draw,
                    success: true,
                    data: rs.data,
                    recordsTotal: rs.recordsTotal,
                    recordsFiltered: rs.recordsFiltered,
                });
            }

            return this.error(res, ErrorCode.CannotGetUser);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async createUser(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            let user = await userService.getByUserName(req.body.username);
            if (user) return this.error(res, ErrorCode.UserIsExisting);
            user = await userService.createUser(req.body, userId);
            return this.ok(res, user);
        } catch (error) {
            console.error(error);
            const message = !isNaN(error.message) ? error.message : ErrorCode.CannotCreateUser;
            return this.error(res, message);
        }
    }

    async registerUser(req, res) {
        try {
            let user = await userService.getByUserName(req.body.username);
            if (user) return this.error(res, ErrorCode.UserIsExisting);
            user = await userService.createUserWithToken(req.body);
            return this.ok(res, user);
        } catch (error) {
            console.error(error);
            const message = !isNaN(error.message) ? error.message : ErrorCode.CannotCreateUser;
            return this.error(res, message);
        }
    }

    async registerUserAndOrg(req, res) {
        try {
            let user = await userService.getByUserName(req.body.username);
            if (user) return this.error(res, ErrorCode.UserIsExisting);
            user = await userService.registerUserAndOrg(req.body)
            if (!user) return this.error(res, ErrorCode.CannotCreateUser);
            return this.ok(res, user);
        } catch (error) {
            console.error(error);
            const message = !isNaN(error.message) ? error.message : ErrorCode.CannotCreateUser;
            return this.error(res, message);
        }
    }

    async changeStatus(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await userService.changeStatus(req.body.userId, userId);
            return this.ok(res, '');
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotChangeStatus);
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await userService.deleteUser(req.params.id, userId);
            return this.ok(res, '');
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotDeleteUser);
        }
    }

    async getAdmins(req, res) {
        try {
            const admins = await userService.getAdmins();
            return this.ok(res, admins);
        } catch (err) {
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async getUserOfTool(req, res) {
        try {
            const users = await userService.getUserOfTools(req.org._id);
            return this.ok(res, users);
        } catch (error) {
            console.error(error);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async updateLanguage(req, res) {
        try {
            const result = await userService.updateLanguage(req.body.lang, req.user._id);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            return this.error(res, ErrorCode.CannotGetLocalization);
        }
    }

    async getAgentQCUsers(req, res) {
        try {
            const users = await userService.getAgentQCUsersByOrgId(req.org._id);

            return this.ok(res, users);
        } catch (err) {
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async updateAgentQcUser(req, res) {
        try {
            const userId = req.headers.userId;
            await userService.updateAgentQcUser(req.body, req.org._id, userId);

            return this.ok(res, '');
        } catch (err) {
            console.error(err);
            return this.error(res, HttpCode.InternalServerError);
        }
    }

    async sendInvitationEmail(req, res) {
        try {
            const data = req.body;
            const domain = req.headers.origin;
            const userId = req.headers.userId;
            const result = await userService.sendUserInvitation(data, domain, userId);
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            const message = !isNaN(error.message) ? error.message : ErrorCode.CannotCreateUser;
            return this.error(res, message);
        }
    }
}

module.exports = new UserController();