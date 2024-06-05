'use strict';
const BaseRouter = require('./base.router');
const travelController = require('../controllers/travel.controller');

const { HttpMethod } = require('../common/constants');

class TravelRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '/tour', travelController.getTour);
        this.route(HttpMethod.GET, '/tour/:id', travelController.getTourById);
        this.route(HttpMethod.GET, '/location', travelController.getLocation);
        this.route(HttpMethod.GET, '/location/:id', travelController.getLocationById);
    }
}

module.exports = new TravelRouter();