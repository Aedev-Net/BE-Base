const Models = require('../models/index');
const User = Models.User;
const NlpEngine = Models.NlpEngine;
const Role = Models.Role;
const Organization = Models.Organization;
const localizationService = require('../services/localization.service');

class StatisticService {
  async statisticByAdmin() {
    const countUsersPromise = User.find({ isDeleted: false }).count();
    const countNlpEnginesPromise = NlpEngine.find({ isDeleted: false }).count();
    const countRolesPromise = Role.find({ isDeleted: false }).count();
    const countOrganizationsPromise = Organization.find({ isDeleted: false }).count();
    const countLocalizationsPromise = localizationService.countLocalizations();
    const [numOfUsers, numOfNlpEngines, numOfRoles, numOfOrganizations, numOfLocalizations] = await Promise.all([countUsersPromise, countNlpEnginesPromise, countRolesPromise, countOrganizationsPromise, countLocalizationsPromise]);

    return {
      numOfUsers,
      numOfRoles,
      numOfNlpEngines,
      numOfOrganizations,
      numOfLocalizations,
    };
  }
}

module.exports = new StatisticService();