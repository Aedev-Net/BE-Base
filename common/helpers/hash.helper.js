'use strict';

const crypto = require('crypto');

class HashHelper {
    hash(algorithm, text) {
        return crypto.createHash(algorithm).update(text).digest('hex');
    }

    md5(text) {
        return this.hash('md5', text);
    }

    sha256(text) {
        return this.hash('sha256', text);
    }

    sha512(text) {
        return this.hash('sha512', text);
    }
}

module.exports = new HashHelper();
