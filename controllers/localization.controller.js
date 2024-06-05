'use strict';

const BaseController = require('./base.controller');
const localizationService = require('../services/localization.service');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action } = require('../common/constants');

class LocalizationController extends BaseController {
    async loadFields(req, res) {
        try {
            await localizationService.loadFields();
            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async getAll(req, res) {
        try {
            const localization = await localizationService.getAllLocalizationsFromRedis();
            return this.ok(res, localization);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async getField(req, res) {
        try {
            const content = await localizationService.getField(req.query.field, req.query.lang);
            return this.ok(res, content);
        } catch (error) {
            console.log(error)
            this.error(res, error.message);
        }

    }

    async getLocalizations(req, res) {
        try {
            const rs = await localizationService.getLocalizations(req.query);
            if (!rs) return this.error(res, ErrorCode.CannotGetLocalization);

            return res.json({
                draw: rs.draw,
                success: true,
                data: rs.data,
                recordsTotal: rs.recordsTotal,
                recordsFiltered: rs.recordsFiltered
            });

        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async createLocalization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await localizationService.createLocalization(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async getLocalizationsById(req, res) {
        try {
            let rs = await localizationService.getLocalizationsById(req.params.id);
            if (rs) return this.ok(res, rs);
            return this.error(res, ErrorCode.LocalizationNotFound);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async updateLocalization(req, res) {
        try {
            const userId = req.headers.userId || req.body.userId;
            await localizationService.updateLocalization(req.body, userId);
            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async importLocalizations(req, res) {
        try {
            await localizationService.importLocalizations(req.body);

            return this.ok(res);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async exportLocalizations(req, res) {
        try {
            const result = await localizationService.exportLocalizations();
            return this.ok(res, result);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }

    async deleteLocalizations(req, res) {
        try {
            await localizationService.deleteLocalizationById(req.params.id);
            return this.ok(res, null);
        } catch (error) {
            console.error(error);
            this.error(res, error.message);
        }
    }
}

module.exports = new LocalizationController();