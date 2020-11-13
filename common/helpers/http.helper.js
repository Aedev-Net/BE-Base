'use strict';

const request = require('request');
const _ = require('lodash');

const appConfig = require('../../configs/app.config');

function send(url, method, headers, body) {
    return new Promise((resolve, reject) => {
        headers = initAuthorizationHeaders(headers);
        const options = {
            url,
            method,
            headers,
            body,
            json: true,
        };

        request(options, (err, res, body) => {
            if (!err && (res.statusCode == 200 || res.statusCode == 304)) return resolve(body);

            if (err) {
                console.error(`${url} ${err}`);
                return reject(res);
            }

            console.error(`${url} ${res.statusCode}`);
            console.error('Error: ', body);
            reject(res);
        });
    });
}

function initAuthorizationHeaders(headers) {
    if (headers) {
        delete headers.host;
        delete headers['accept-encoding'];
        delete headers['content-length'];
        delete headers.connection;
        delete headers.accept;
        delete headers['content-type'];
        headers.authorization = appConfig.serverApiKey;
    } else {
        headers = {
            authorization: appConfig.serverApiKey
        }
    }
    return headers;
}

function convertObjectToUrlParams(obj) {
    return convertObject(obj);

    function convertArray(arr, name) {
        if (!arr || typeof arr !== 'object' || arr.constructor !== Array) return `${name}=`;
        const queries = [];
        arr.forEach((val, i) => {
            const q = convertObject(val, `${name}%5B${i}%5D`);
            queries.push(q);
        });
        return queries.join('&');
    }

    function convertObject(obj, name) {
        const queryName = name ? name : 'q';
        if (obj === null) return `${queryName}=`;
        if (obj === undefined) return `${queryName}=`;
        if (typeof obj === 'boolean') return `${queryName}=${obj}`;
        if (typeof obj === 'number' && isFinite(obj)) return `${queryName}=${obj}`;
        if (typeof obj === 'string' || obj instanceof String) return `${queryName}=${encodeURIComponent(obj)}`;
        if (obj instanceof Date) return `${queryName}=${obj.toJSON()}`;
        if (obj && typeof obj === 'object' && obj.constructor === Array) return convertArray(obj, queryName);
        if (obj && typeof obj === 'object' && obj.constructor === Object) {
            const keys = Object.keys(obj);
            const queries = [];
            keys.forEach(key => {
                const qName = name ? `${name}%5B${key}%5D` : key;
                const q = convertObject(obj[key], qName);
                queries.push(q);
            });
            return queries.join('&');
        }
        return `${queryName}=${obj}`;
    }
}

class HttpHelper {
    static async get(url, params, headers) {
        const urlParams = convertObjectToUrlParams(params);
        url = url.indexOf('?') >= 0 ? `${url}&${urlParams}` : `${url}?${urlParams}`;
        const res = await send(url, 'GET', headers);
        return res;
    }

    static async post(url, body, headers) {
        const res = await send(url, 'POST', headers, body);
        return res;
    }

    static async put(url, body, headers) {
        const res = await send(url, 'PUT', headers, body);
        return res;
    }

    static async delete(url, headers) {
        const res = await send(url, 'POST', headers);
        return res;
    }

    static async send(url, method, headers, body) {
        const res = await send(url, method, headers, body);
        return res;
    }
}

module.exports = HttpHelper;