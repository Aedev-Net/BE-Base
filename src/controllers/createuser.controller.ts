import BaseController from './base.controller'
import {Request, Response} from 'express';
import dbConnection from "../db/database";
import AppUserModel from "../models/app-user.model";

// import formidable from 'formidable';

class CreateUserController extends BaseController {
    async createUser(req: Request, res: Response) {
        const {device_id, user_name, user_id} = req.body;
        console.log("request:: " + req.body)
        let conn;
        try {
            conn = await AppUserModel.create({device_id, user_name, user_id})
            return res.status(201).json(conn);
        } catch (err) {
            console.log(err)
            return res.status(500).send('Error creating record');
        } finally {
        }
    }

    async getData(req: Request, res: Response) {
        const query = `
            SELECT e.employee_id,
                   e.employee_name,
                   d.name
            FROM employees e
                     JOIN department d ON e.department_id = d.department_id
        `;

        try {
            console.log('Query results:',  await dbConnection.query(query));
            return res.status(200);
        } catch (error) {
            console.error('Error executing query:', error);
        }

    }

    test(req: Request, res: Response) {
        return res.send('test');
    }
}

export default new CreateUserController();
