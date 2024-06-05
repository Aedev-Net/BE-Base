import {ErrorCode} from '../common/enum'

export class BaseService{
    error(errorCode:string){
        throw new Error(errorCode);
    }
}
