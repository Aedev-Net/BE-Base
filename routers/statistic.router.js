'use strict';
const BaseRouter = require('./base.router');
const statisticController = require('../controllers/statistic.controller');

const { HttpMethod } = require('../common/constants');
const Right = require('../common/rights');

class RoleRouter extends BaseRouter {
  init() {
    this.route(HttpMethod.GET, '/admin', statisticController.statisticByAdmin, [Right.Basic]);
  }
}

module.exports = new RoleRouter();