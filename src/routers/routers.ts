import { Request, Application, Response } from "express";
import { routers } from '../config/router.config';
import uploadRouter from './uploadfile.router';
import downloadRouter from './downloadfile.router';
import path from 'path';
import createuserRouter from "./createuser.router";


class Routers {
    app: Application;
    constructor(app: Application) {
        this.app = app;
    }

    _initRoute() {
        // this.app.route('/test').get((req, res) => {
        //     console.log('hello')
        //     return res.status(200).send("Hello ola");
        // });

        this.app.use('/api', uploadRouter.getRouter());
        this.app.use('/api', downloadRouter.getRouter());
        this.app.use('/api', createuserRouter.getRouter());
        downloadRouter.init();
        uploadRouter.init();
        createuserRouter.init();
    }

}

export default Routers;