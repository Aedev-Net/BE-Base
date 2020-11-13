class BaseService {
    error(errorCode) {
        throw new Error(errorCode);
    }
}

module.exports = BaseService;