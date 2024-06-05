'use strict';
const BaseRouter = require('./base.router');
const localizationController = require('../controllers/localization.controller');

const { HttpMethod } = require('../common/constants');
const Rights = require('../common/rights');

class LocalizationRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '', localizationController.getAll);
        this.route(HttpMethod.GET, '/delete/:id', localizationController.deleteLocalizations, [Rights.AdminDeleteLocalizations]);
        this.route(HttpMethod.GET, '/export', localizationController.exportLocalizations, [Rights.AdminExportLocalizations]);
        this.route(HttpMethod.GET, '/reload', localizationController.loadFields, [Rights.AdminReloadCaches]);
        this.route(HttpMethod.GET, '/field', localizationController.getField, [Rights.AdminViewLocalizations]);
        this.route(HttpMethod.GET, '/list', localizationController.getLocalizations, [Rights.AdminViewLocalizations]);
        this.route(HttpMethod.POST, '/import', localizationController.importLocalizations, [Rights.AdminImportLocalizations]);
        this.route(HttpMethod.POST, '', localizationController.createLocalization, [Rights.AdminCreateLocalizations]);
        this.route(HttpMethod.GET, '/:id', localizationController.getLocalizationsById, [Rights.AdminViewLocalizations]);
        this.route(HttpMethod.PUT, '', localizationController.updateLocalization, [Rights.AdminUpdateLocalizations]);
    }
}

module.exports = new LocalizationRouter();