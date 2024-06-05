'use strict';

const moment = require('moment');
const uuid = require('uuid/v4');
const { User, Token, Organization, Role, NlpEngine } = require('../models');
const { PasswordHelper, JwtHelper, UniqueHelper, MailHelper, DateTimeHelper } = require('../common/helpers');
const { ErrorCode, Lang } = require('../common/enums');
const { TokenType, Url } = require('../common/constants');
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

async function getUserByCredentials(credentials) {
    if (!credentials || !credentials.username || !credentials.password) return;

    const query = {
        username: credentials.username.toLowerCase(),
        password: PasswordHelper.hash(credentials.username.toLowerCase(), credentials.password),
        isActive: true,
        isDeleted: false,
    };

    const user = await User.findOne(query).lean();
    if (!user) return;

    const org = await getOrganizationById(user.organization);
    if (!org) return;

    const role = await getRoleById(user.role);
    if (!role) return;

    const engine = await getNlpEngineByOrgId(user.organization);

    user.org = org;
    user.role = role;
    user.engine = engine;

    return user;
}

async function getNlpEngineByOrgId(orgId) {
    const engine = await NlpEngine.findOne({
        organization: orgId,
        isActive: true,
        isDeleted: false,
    }).lean();

    return engine;
}

async function getNlpEngineByAppIdAndAppSecret(appId, appSecret) {
    if (!appId || !appSecret) return;

    const query = {
        appId,
        appSecret,
        isActive: true,
        isDeleted: false,
    };

    const engine = await NlpEngine.findOne(query).lean();
    if (!engine) return;

    const org = await getOrganizationById(engine.organization);
    if (!org) return;

    engine.org = org;
    return engine;
}

async function getNlpEngineById(id) {
    if (!id) return;

    const query = {
        _id: id,
        isActive: true,
        isDeleted: false,
    };

    const engine = await NlpEngine.findOne(query).lean();
    if (!engine) return;

    const org = await getOrganizationById(engine.organization);
    if (!org) return;

    engine.org = org;
    return engine;
}

async function getRoleById(id) {
    if (!id) return;

    const role = await Role.findOne({
        _id: id,
        isActive: true,
        isDeleted: false
    }).lean();

    return role;
}

async function getOrganizationById(id) {
    if (!id) return;

    const org = await Organization.findOne({
        _id: id,
        isActive: true,
        isDeleted: false
    }).lean();

    return org;
}

async function generateToken(data, tokenType, expiresIn, userAgent) {
    const claims = {
        tokenId: uuid(),
        user: data.user,
        org: data.org,
        role: data.role,
        engine: data.engine,
        type: tokenType,
        userAgent: userAgent,
    }
    const options = {
        expiresIn: expiresIn || 60 * 60 * 24 * 30,
    };

    const token = JwtHelper.generateToken(claims, options);
    const expiredTime = moment().add(options.expiresIn, 'seconds').toDate();

    await saveToken(claims, token, expiredTime);

    return {
        token,
        expiredTime
    };
}

async function saveToken(claims, tokenString, expiredTime) {
    const token = new Token({
        user: claims.userId,
        username: claims.username,
        organization: claims.organizationId,
        organizationName: claims.organizationName,
        tokenId: claims.tokenId,
        token: tokenString,
        expiredTime: expiredTime,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: claims.userId,
        updatedBy: claims.userId,
    });
    await token.save();
}

async function generateAppToken(engine) {
    if (!engine || !engine.org) throw new Error(ErrorCode.AppIdOrAppSecretIsIncorrect);

    const tokenData = {
        org: {
            _id: engine.org._id,
            name: engine.org.name,
        },
        engine: {
            _id: engine._id,
            name: engine._name,
        },
        role: {
            rights: [-1], // App Token
        },
    };

    const token = await generateToken(tokenData, TokenType.App, 60 * 60 * 24 * 30 * 3);
    return token;
}

const AuthConfigs = [];

class AuthService {
    async login(credentials, userAgent) {
        const user = await getUserByCredentials(credentials);
        if (!user) throw new Error(ErrorCode.UsernameOrPasswordIsIncorrect);

        const tokenData = {
            lang: user.lang || Lang.VI,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                isChangedPassword: user.isChangedPassword,
            },
            org: {
                _id: user.org._id,
                name: user.org.name,
            },
            role: {
                _id: user.role._id,
                name: user.role.name,
                rights: user.role.rights,
            },
            avatar: user.avatar,
        };

        if (user.engine) tokenData.engine = {
            _id: user.engine._id,
        };

        const token = await generateToken(tokenData, TokenType.User, null, userAgent);
        tokenData.accessToken = token;
        LogHelper.logAction(user._id, Action.LogIn);
        return tokenData;
    }

    async logout(tokenId, userId) {
        const token = await Token.findOne({
            tokenId: tokenId,
            isDeleted: false,
        });

        if (!token) throw new Error(ErrorCode.TokenIsInvalid);

        token.isDeleted = true;
        token.save();
        LogHelper.logAction(userId, Action.LogOut);
        return true;
    }

    async getAppTokenByAppIdAndAppSecret(appId, appSecret) {
        const engine = await getNlpEngineByAppIdAndAppSecret(appId, appSecret);
        return await generateAppToken(engine);
    }

    async getAppTokenByEngineId(engineId) {
        const engine = await getNlpEngineById(engineId);
        return await generateAppToken(engine);
    }

    authorize(url, method, rights) {
        if (!url || !method || !rights || rights.length == 0) return false;

        const authConfig = AuthConfigs.find(config => url == config.fullUrl && method == config.method) || AuthConfigs.find(config => url.startsWith(`${config.fullUrl}`) && method == config.method);
        if (!authConfig) return false;

        if (rights[0] == -1) return true; // App Token

        for (let i = 0; i < authConfig.rights.length; i++) {
            if (rights.includes(authConfig.rights[i].Code)) return true;
        }

        return false;
    }

    async verifyAppId(appId) {
        const engine = await NlpEngine.findOne({
            appId
        }).lean();

        return engine;
    }

    async getNlpEngineByOrgId(orgId) {
        return await getNlpEngineByOrgId(orgId);
    }

    async getNlpEngineById(engineId) {
        if (!engineId) return;
        const reqExpObjectId = new RegExp("^[0-9a-fA-F]{24}$");
        if (!engineId.match(reqExpObjectId)) return;

        return await NlpEngine.findOne({
            _id: engineId,
            isActive: true,
            isDeleted: false,
        }).lean();
    }

    async verifyToken(accessToken, userAgent, url, method) {
        if (!accessToken) {
            throw new Error(ErrorCode.TokenIsInvalid);
        }

        if (!accessToken.startsWith('Bearer')) {
            throw new Error(ErrorCode.TokenIsInvalid);
        }

        const token = JwtHelper.verifyToken(accessToken.substr(7, accessToken.length - 7));

        if (!token) {
            throw new Error(ErrorCode.TokenIsInvalid);
        }

        // if (token.userAgent != userAgent) {
        //     throw new Error(ErrorCode.TokenIsInvalid);
        // }

        if (token.type == TokenType.User) {
            const user = await User.findOne({
                _id: token.user._id,
                isActive: true,
                isDeleted: false,
            }).lean();
            if (!user) {
                throw new Error(ErrorCode.UserIsNotFound);
            }

            if (url != Url.ChangePassword && !user.isChangedPassword) throw new Error(ErrorCode.NotChangePassword);

            const existingToken = await Token.findOne({ tokenId: token.tokenId }).lean();
            if (!existingToken) {
                throw new Error(ErrorCode.TokenIsInvalid);
            }

            if (new Date(existingToken.expiredTime).getTime() < new Date().getTime()) {
                throw new Error(ErrorCode.TokenIsExpired);
            }
        }

        const authorized = this.authorize(url, method, token.role.rights);
        if (!authorized) {
            throw new Error(ErrorCode.Unauthorized);
        }

        return token;
    }

    addAuthConfig(config) {
        AuthConfigs.push(config);
    }

    async checkUsername(username) {
        const user = await User.findOne({
            username: username.toLowerCase()
        }).lean();

        if (user) return { success: true, message: 'Username existed!' };

        return {
            success: false,
        }
    }

    async getNlpEngineSetting(engineId) {
        if (!engineId) throw new Error(ErrorCode.NlpEngineNotFound);

        const nlpEngine = await NlpEngine.findById(engineId);
        if (!nlpEngine) throw new Error(ErrorCode.NlpEngineNotFound);

        nlpEngine.appId = nlpEngine.appId || UniqueHelper.generateAppId();
        nlpEngine.appSecret = nlpEngine.appSecret || UniqueHelper.generateAppSecret();
        nlpEngine.appToken = nlpEngine.appToken || (await this.getAppTokenByEngineId(engineId)).token;

        await nlpEngine.save();

        return {
            _id: nlpEngine._id,
            token: nlpEngine.appToken,
            appId: nlpEngine.appId,
            appSecret: nlpEngine.appSecret,
            webhook: nlpEngine.webhook,
            isTwoChannels: nlpEngine.isTwoChannels,
            isMultiIntents: nlpEngine.isMultiIntents,
            confidentRanges: nlpEngine.confidentRanges,
        };
    }

    async resetAppToken(engineId) {
        if (!engineId) throw new Error(ErrorCode.NlpEngineNotFound);

        const nlpEngine = await NlpEngine.findById(engineId);
        if (!nlpEngine) throw new Error(ErrorCode.NlpEngineNotFound);

        nlpEngine.appToken = (await this.getAppTokenByEngineId(engineId)).token
        nlpEngine.save();

        return {
            appToken: nlpEngine.appToken,
        };
    }

    async resetAppSecret(engineId) {
        if (!engineId) throw new Error(ErrorCode.NlpEngineNotFound);

        const nlpEngine = await NlpEngine.findById(engineId);
        if (!nlpEngine) throw new Error(ErrorCode.NlpEngineNotFound);

        nlpEngine.appSecret = UniqueHelper.generateAppSecret();
        nlpEngine.save();

        return {
            appSecret: nlpEngine.appSecret,
        };
    }

    async changePassword(userId, body) {
        //check old passowrd
        const user = await User.findById(userId).select('username password');
        if (!user) throw new Error('user not found!');
        const encryptOldPassword = PasswordHelper.hash(user.username, body.oldPassword);
        if (encryptOldPassword == user.password) {
            const encryptNewPassword = PasswordHelper.hash(user.username, body.newPassword);
            user.password = encryptNewPassword;
            user.isChangedPassword = true;
            user.save();
            return { success: true }
        } else {
            throw new Error(ErrorCode.OldPasswordNotCorrect);
        }

    }

    async vnlpToolChangePassword(userId, body) {
        //check old passowrd
        const user = await User.findById(userId).select('username password');
        const encryptOldPassword = PasswordHelper.hash(user.username, body.oldPassword);
        if (encryptOldPassword == user.password) {
            const encryptNewPassword = PasswordHelper.hash(user.username, body.newPassword);
            user.password = encryptNewPassword;
            user.save();
            return { success: true }
        } else {
            throw new Error('old-password-incorrect')
        }
    }

    async sendResetPasswordLink(username, clientUrl) {
        const user = await User.findOne({ username: username });
        if (!user) throw new Error(ErrorCode.UserIsNotFound);
        if (!user.email) throw new Error(ErrorCode.EmailDoesNotExist);
        const name = user.name;
        const userEmail = user.email;
        const data = {
            tokenId: uuid(),
            user: user,
            type: TokenType.User,
        }
        const options = {
            expiresIn: 15 * 60,
        }
        const newToken = JwtHelper.generateToken(data, options);
        await saveToken(data, newToken);
        await MailHelper.sentEmailResetPasswordToProvider(userEmail, name, username, newToken, clientUrl);
        return { success: true };
    }

    async updateForgotPassword(password, token) {
        const data = JwtHelper.verifyToken(token);
        if (data) {
            const user = await User.findById(data.user._id);
            if (!user) {
                throw new Error(ErrorCode.UserIsNotFound);
            }
            const encryptPassword = PasswordHelper.hash(user.username, password);
            user.password = encryptPassword;
            user.isChangedPassword = true;
            await user.save();
            return true;
        } else {
            throw new Error(ErrorCode.TokenIsInvalid);
        }
    }
}

module.exports = new AuthService();
