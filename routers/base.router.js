const authController = require('../controllers/auth.controller');
const authService = require('../services/auth.service');
const redirectService = require('../services/redirect.service');

const { HttpMethod } = require('../common/constants');

class BaseRouter {
    constructor() {
        this.router = require('express').Router();
        this.roots = [];
    }
    route(method, url, action, rights, service) {
        const index = url.indexOf(':');
        let fixedUrl;
        if (index >= 0) {
            fixedUrl = url.substring(0, index - 1);
        }

        if (service) {
            this.roots.forEach(root => {
                redirectService.addServiceConfig({ url: `${root}${fixedUrl || url}`, method, service });
            });
        }

        if (rights) {
            this.roots.forEach(root => {
                const fullUrl = `${root}${(!fixedUrl && fixedUrl != '') ? url : fixedUrl}`;
                authService.addAuthConfig({ fullUrl, method, rights });
            });
        }

        switch (method) {
            case HttpMethod.POST:
                rights ? this.router.post(url, authController.verify, action) : this.router.post(url, action);
                break;
            case HttpMethod.PUT:
                rights ? this.router.put(url, authController.verify, action) : this.router.put(url, action);
                break;
            case HttpMethod.DELETE:
                rights ? this.router.delete(url, authController.verify, action) : this.router.delete(url, action);
                break;
            default:
                rights ? this.router.get(url, authController.verify, action) : this.router.get(url, action);
                break;
        }
    }

    getRouter() {
        return this.router;
    }

    addRoot(path) {
        this.roots.push(path);
    }
}

module.exports = BaseRouter;