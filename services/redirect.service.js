'use strict';

const Busboy = require('busboy');
const axios = require('axios');
const httpHelper = require('../common/helpers/http.helper');
const appConfig = require('../configs/app.config');

function getServiceHost(originalUrl, method) {
    if (!ServiceConfigs || ServiceConfigs.length === 0) return appConfig.remoteServers.nlp;

    const router = ServiceConfigs.find(config => originalUrl.startsWith(`${config.url}`) && config.method == method);
    if (!router) return appConfig.remoteServers.nlp;

    return router.service;
}

const ServiceConfigs = [];

class RedirectService {
    async redirect(originalUrl, method, headers, body) {
        const serviceHost = getServiceHost(originalUrl, method);
        const url = `${serviceHost}${originalUrl}`;
        const resData = await httpHelper.send(url, method, headers, body);
        return resData;
    }

    async uploadFile(originalUrl, method, headers, body, req) {
        try {
            return new Promise((resolve, reject) => {
                const serviceHost = getServiceHost(originalUrl, method);
                const url = `${serviceHost}${originalUrl}`;
                const busboy = new Busboy({
                    headers
                });
                headers = initAuthorizationHeaders(headers);
                let extraData = {};
                busboy.on('field', function (fieldname, val) {
                    extraData[fieldname] = val;
                });
                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                    let dataBuffer = '';
                    file.on('data', (chunk) => {
                        dataBuffer += chunk;
                    });
                    file.on('end', () => {
                        const data = {
                            fileData: dataBuffer,
                            data: extraData,
                            fileName: filename,
                        }
                        axios.post(url, data, { headers }).then(response => {
                            return resolve(response.data);
                        }).catch(err => {
                            console.error(err);
                            return resolve(err);
                        });

                    });
                });

                req.pipe(busboy);
            });

        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async uploadFileAudio(originalUrl, method, headers, body, req) {
        try {
            return new Promise((resolve, reject) => {
                const serviceHost = getServiceHost(originalUrl, method);
                const url = `${serviceHost}${originalUrl}`;
                const busboy = new Busboy({
                    headers
                });
                headers.authorization = appConfig.serverApiKey;
                initAuthorizationHeaders(headers);

                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                    const dataBuffer = [];
                    file.on('data', (chunk) => {
                        dataBuffer.push(chunk);
                    });
                    file.on('end', () => {
                        axios.post(url, Buffer.concat(dataBuffer),
                            {
                                headers: {
                                    ...headers,
                                    'Content-type': 'audio/wav'
                                },
                                maxBodyLength: 100 * 1024 * 1024,
                                maxContentLength: 100 * 1024 * 1024,
                            }).then(response => {
                                return resolve(response.data);
                            }).catch(err => {
                                console.error(err);
                                return resolve(err);
                            });
                    });
                });

                req.pipe(busboy);
            });

        } catch (error) {
            console.error(error);
            return error;
        }
    }

    addServiceConfig(config) {
        ServiceConfigs.push(config);
    }
}

module.exports = new RedirectService();

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