const express = require('express');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const cors = require('cors');
const routers = require('../configs/router.config');
const appConfig = require('../configs/app.config');
const http = require('../common/helpers/http.helper');

const oneWeek = 604800000;

class Server {
    start() {
        this.app = express();
        this.initViewEngine();
        this.initStatic();
        this.initRouters();
        this.initHandleException();

        this.app.listen(appConfig.env.port, () => {
            console.log(`Server started on ${appConfig.env.host}:${appConfig.env.port}`);
        });
    }

    initViewEngine() {
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(expressLayouts);
    }

    initStatic() {
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT , type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(busboy());
        this.app.use('/public', express.static(path.join(__dirname, '../public'), {
            etag: false,
            maxAge: oneWeek,
        }));
        this.app.use('/doc', express.static(path.join(__dirname, '../doc'), {
            etag: false,
            maxAge: oneWeek,
        }));
    }

    initRouters() {
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(function (req, res, next) {
            req.headers['if-none-match'] = 'no-match-for-this';
            next();
        });
        routers.forEach((router) => {
            const route = require(path.resolve(router.router));
            route.addRoot(router.path);
            route.init();
            this.app.use(router.path, route.getRouter());
        });
    }

    initHandleException() {
        this.app.use((err, req, res, next) => {
            console.error(err);
            if (err.type !== undefined && err.type === 'json') {
                res.status(err.status || 500).send(err);
            } else {
                res.status(err.status || 500);
                res.json(err);
            }
        });

        process.on('unhandledRejection', (reason, p) => {
            console.error(`Unhandled Rejection at Promise. ${reason}`);
            p.catch(err => console.error(err.stack));
        });

        process.on('uncaughtException', (err) => {
            console.error(`Uncaught Exception thrown. ${err.message}`);
            console.error(err.stack);
        });
    }
}

module.exports = new Server();
