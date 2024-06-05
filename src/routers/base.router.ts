import { HttpMethod } from '../common/constants'
import express, { Router, Request, Response } from 'express';

export class BaseRouter {
    router: Router;
    roots: any;
    constructor() {
        var a = express().route
        this.router = express.Router();
        this.roots = [];
    }

    route(method = HttpMethod.GET, url:string,action:any) {
        switch (method) {
            case HttpMethod.POST:
                this.router.post(url,action);
                break;
            case HttpMethod.PUT:
                this.router.put(url,action);
                break;
            case HttpMethod.DELETE:
                this.router.delete(url,action);
                break;
            default:
                this.router.get(url,action);
                break;
        }
    }

    getRouter() {
        return this.router;
    }

    addRoot(path:string) {
        this.roots.push(path);
    }
}