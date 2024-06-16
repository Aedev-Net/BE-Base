import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import db from './db/database';
import route from './routers/routers'
import AppUser from './models/app-user.model'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documents/swagger.json';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this._setConfig();
        AppUser.sync({alter:true})
    }

    private async _setConfig() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT, type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this._initRouters();
        this._initSwagger();
        this._initHandleException();
        new route(this.app)._initRoute();
        // await db.connect();
    }



    private _initRouters() {
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(
            function (req, res, next) {
                req.headers['if-none-match'] = 'no';
                next();
            }
        );
    }

    private _initHandleException() {
        this.app.use(function (err:any, req: Request, res: Response, next:any) {
            if (err.type !== undefined && err.type == 'json') {
                res.status(err.status || 500).send(err);
            } else {
                res.status(err.status || 500);
                res.json(err);
            }
        });
    }

    private _initSwagger() {
        const options = {
            customCss: '.logo__img {' + "content:url('https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png');" + '}',
        };
        this.app.use('/api-docs', swaggerUi.serve);
        this.app.get('/api-docs', swaggerUi.setup(swaggerDocument,options));
    }
}

export default new App().app;
