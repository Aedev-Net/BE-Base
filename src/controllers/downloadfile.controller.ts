import BaseController from "./base.controller";
import { Request, Response } from "express";

class DownloadFileController extends BaseController {
    downloadFile(req: Request, res: Response) {
        const file = 'D:\\back-end\\src\\assets\\images\\1.jpg';
        res.download(file);
    }

}
export default new DownloadFileController();