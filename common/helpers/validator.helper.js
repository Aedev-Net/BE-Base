'use strict';

class ValidatorHelper {
    validateCriteria(criteria) {
        if (!criteria) criteria = {};
        criteria.start = criteria.start ? parseInt(criteria.start) : 0;
        criteria.length = criteria.length ? parseInt(criteria.length) : 0;
        criteria.search = criteria.search || {};
        return criteria;
    }
}

module.exports = new ValidatorHelper();