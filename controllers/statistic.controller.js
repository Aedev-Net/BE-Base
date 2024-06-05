'use strict';

const BaseController = require('./base.controller');
const ErrorCode = require('../common/enums').ErrorCode;
const statisticService = require('../services/statistic.service');

class StatisticController extends BaseController {
  async statisticByAdmin(req, res) {
    try {
      const data = await statisticService.statisticByAdmin();
      return this.ok(res, data);
    } catch (error) {
      console.error(error);
      return this.error(res, ErrorCode.CannotStatisticByAdmin);
    }
  }
}

module.exports = new StatisticController();