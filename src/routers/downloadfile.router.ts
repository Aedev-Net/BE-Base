import { BaseRouter } from "./base.router";
import { HttpMethod } from "../common/constants";
import downloadController from '../controllers/downloadfile.controller'

class DownloadFileRouter extends BaseRouter{
    init(){
        this.route(HttpMethod.GET,'/download',downloadController.downloadFile);
    }
}

export default new DownloadFileRouter();