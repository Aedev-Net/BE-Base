const { Localization } = require('../models');
const constants = require('../common/constants');
const Lang = constants.Lang;
const validatorHelper = require('../common/helpers/validator.helper');
const ErrorCode = require('../common/enums').ErrorCode;
const LogHelper = require('../common/helpers/log.helper');
const { Action, REDIS_KEY } = require('../common/constants');
const cacheRedisHelper = require('../common/helpers/cache-redis.helper');

class LocalizationService {
    async loadFields() {
        const localizations = await Localization.find({ isDeleted: { $ne: true } }).lean();
        await cacheRedisHelper.cacheToRedis(REDIS_KEY.Localizations, localizations);
        console.log('LOCALIZATION CACHED!');
    }

    async getAllLocalizationsFromRedis() {
        let allLocalizations = await cacheRedisHelper.getDataFromRedis(REDIS_KEY.Localizations);
        if (!allLocalizations) {
            await this.loadFields();
            allLocalizations = await cacheRedisHelper.getDataFromRedis(REDIS_KEY.Localizations);
        }

        return allLocalizations || [];
    }

    getField(fieldName, language) {
        language = language ? language.toLowerCase() : Lang.VI;
        if (!localizations) return fieldName;
        var field = localizations.find(x => x.field == fieldName);
        if (!field) return fieldName;
        var value = field.values.find(x => x.language == language);
        if (!value) return fieldName;
        return value.content;
    }

    async getLocalizations(criteria) {
        const localizations = await this.getAllLocalizationsFromRedis();
        const checkedCriteria = validatorHelper.validateCriteria(criteria);
        let data;
        if (checkedCriteria && checkedCriteria.search && checkedCriteria.search.value) {
            data = localizations.filter(item => {
                if (!item || !item.field || !item.values || item.values.length == 0) return false;

                if (item.field.includes(checkedCriteria.search.value)) return true;

                for (let value of item.values) {
                    if (!value || !value.content) continue;

                    if (value.content.includes(checkedCriteria.search.value)) return true;
                }

                return false;
            });
        } else {
            data = localizations.filter(item => item.field);
        }

        if (!criteria || !criteria['order'] || criteria['order'][0]['dir'] == 'asc') data = sortLocalization(data);
        else if (criteria['order'][0]['dir'] == 'desc') data = sortLocalization(data).reverse();

        const recordsTotal = localizations.length;
        const recordsFiltered = data.length;
        const end = checkedCriteria.start + checkedCriteria.length;
        data = data.slice(checkedCriteria.start, end);

        return {
            data,
            recordsTotal,
            recordsFiltered,
        };
    };

    async getLocalizationsById(query) {
        const local = await Localization.findById(query);
        return local;
    };

    async createLocalization(locals, userId) {
        const localizations = await this.getAllLocalizationsFromRedis();
        const foundLocalization = localizations.find(item => item.field == locals.field);
        if (foundLocalization) throw new Error(ErrorCode.LocalizationExisted);

        if (locals) {
            locals.field = locals.field && locals.field.trim();
        }

        const newData = JSON.stringify(locals);
        LogHelper.logAction(userId, Action.CreateLocalization, '', newData);
        const newLocalization = new Localization(locals);

        await newLocalization.save();
        await this.loadFields();
    }

    async deleteLocalizationById(id) {
        let localization = await Localization.findById(id);
        if (localization) {
            localization.updatedAt = new Date();
            localization.isDeleted = true;
            await localization.save();
            await this.loadFields();
            return true;
        } else {
            return false;
        }
    }

    async updateLocalization(local, userId) {
        const localizations = await this.getAllLocalizationsFromRedis();
        const localization = localizations.find(item => item._id == local._id);
        if (!localization) throw new Error(ErrorCode.LocalizationNotFound);
        const oldData = JSON.stringify(localization);
        local.values.forEach(value => {
            const valueItem = localization.values.find(x => x.language == value.language);
            if (!valueItem) {
                localization.values.push({
                    language: value.language,
                    content: value.content,
                })
            } else {
                valueItem.content = value.content;
            }
        });
        localization.field = local.field && local.field.trim();
        await Localization.update({ _id: localization._id }, localization);
        const newlocalization = localizations.find(item => item._id == local._id);
        const newData = JSON.stringify(newlocalization);
        LogHelper.logAction(userId, Action.UpdateLocalization, oldData, newData);
        await this.loadFields();
    }

    async countLocalizations() {
        const localizations = await this.getAllLocalizationsFromRedis();
        return localizations.length;
    }

    async exportLocalizations() {
        const data = await Localization.find({ isDeleted: { $ne: true }, isActive: { $ne: false } })
            .collation({ locale: "en" })
            .sort({ field: 1 })
            .select({ field: 1, values: 1 })
            .lean();
        if (!data) data = [];
        data.map(d => {
            delete d._id;
            return d;
        })
        return JSON.stringify(data, null, 2);
    }

    async importLocalizations(newLocalizations) {
        // Query existed localizations in database
        const localizations = await this.getAllLocalizationsFromRedis();

        const promises = [];
        // Get valid localizations from file
        for (let localization of newLocalizations) {
            const duplicateLocalizationKey = localizations.find(item => item.field == localization.field);
            if (duplicateLocalizationKey) continue;

            delete localization._id;
            const newLocalization = new Localization(localization);
            promises.push(newLocalization.save());
        }
        await Promise.all(promises);
    }
}

module.exports = new LocalizationService();

function sortLocalization(localizations) {
    if (!localizations || localizations.length == 0) return [];

    localizations = localizations.sort((a, b) => {
        if (a.field.toLowerCase() > b.field.toLowerCase()) {
            return 1;
        }
        if (b.field.toLowerCase() > a.field.toLowerCase()) {
            return -1;
        }
        return 0;
    });

    return localizations;
}