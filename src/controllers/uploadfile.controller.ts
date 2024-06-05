import BaseController from './base.controller'
import { Request, Response } from 'express';
// import formidable from 'formidable';
import { IncomingForm } from 'formidable';
import  fs from 'fs';

class UploadFileController extends BaseController {
    uploadFile(req: Request, res: Response) {
        const form = new IncomingForm();
        form.multiples = true;
        form.on('file',(name,file)=>{
            console.log(file.name);
        });
        form.on('field',(key,value)=>{
            console.log(key)
        });
        form.parse(req);
        return res.send('test');
    }

    test(req:Request,res:Response){
        return res.send('test');
    }
}

export default new UploadFileController();