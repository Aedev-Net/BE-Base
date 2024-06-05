import {BaseRouter} from './base.router';
import { HttpMethod } from '../common/constants';
import uploadfileController from '../controllers/uploadfile.controller';

class UploadFileRouter extends BaseRouter{
    init(){
        this.route(HttpMethod.POST,'/postFile',uploadfileController.uploadFile);
        this.route(HttpMethod.GET,'/up',uploadfileController.test)
    }
}

export default new UploadFileRouter();