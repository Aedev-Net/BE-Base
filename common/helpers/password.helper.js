'use strict';

const hashHelper = require('./hash.helper');

class PasswordHelper {
    hash(username, password) {
        return hashHelper.sha512(`${username}.${password}`);
    }
}
module.exports = new PasswordHelper();
