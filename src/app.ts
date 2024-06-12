import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import db from './db/database';
import route from './routers/routers'
import AppUser from './models/app-user.model'

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
}

export default new App().app;
