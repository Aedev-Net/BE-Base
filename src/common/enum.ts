
const HttpCode = Object.freeze({
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
    ServiceUnavilable: 503,
});

const ErrorCode = Object.freeze({
    None: 0,
    DataNotFound: 1,

    //Auth: 100 - 199
    UsernameOrPasswordIsIncorrect: 100,
    TokenIsInvalid: 101,
    TokenIsExpired: 102,
    Unauthorized: 103,
    NotChangePassword: 104,
    AppIdOrAppSecretIsIncorrect: 105,
    UnauthorizedOrg: 106,
    OldPasswordNotCorrect: 107,

    //User: 200-299
    UserIsNotFound: 200,
    CannotChangeStatus: 201,
    CannotGetUser: 202,
    CannotUpdateUser: 203,
    CannotCreateUser: 204,
    CannotDeleteUser: 205,
    UserIsExisting: 206,
    EmailIsExisting: 207,
    CannotSendEmail: 208,
    EmailDoesNotExist: 209,

    //Organization:300-399
    CannotGetOganization: 300,
    OrganizationNotFound: 301,
    CannotCreateOganization: 302,
    CannotUpdateOganization: 303,
    CannotDeleteOganization: 304,
    OrganizationIsExisting: 305,

    //Role:400-499
    CannotGetRole: 400,
    RoleNotFound: 401,
    CannotCreateRole: 402,
    CannotUpdateRole: 403,
    CannotGetRights: 404,

    //Localization:500-599
    CannotGetLocalization: 500,
    LocalizationNotFound: 501,
    CannotCreateLocalization: 502,
    CannotUpdateLocalization: 503,
    LocalizationExisted: 504,

    //NlpEngine:600-699
    CannotGetNlpEngine: 600,
    NlpEngineNotFound: 601,
    CannotCreateNlpEngine: 602,
    CannotUpdateNlpEngine: 603,
    NlpEngineExisted: 604,
    CannotDeleteNlpEngine: 605,

    //Redirect:600-699
    NoDataResponse: 600,

    //Tutorial:700-799
    CannotGetTutorial: 700,
    TutorialNotFound: 701,
    CannotCreateTutorial: 702,
    CannotUpdateTutorial: 703,
    TutorialExisted: 704,
    CannotDeleteTutorial: 705,

    //Statistic:800-899
    CannotStatisticByAdmin: 801,

    // Prebuild: 900-909
    CannotImportWhenInProgress: 900,

    //Test-samples:910-919
    ExistedDataset: 910,

    //Correction-Dictionary
    DuplicateCorrectionWord: 1104,

    //Feed-back
    CannotGetFeedback: 1200,
    CannotCreateFeedback: 1201,
    CannotVerifyFeedback: 1202,
    CannotGetFeedbackOption: 1204,
});
export { HttpCode, ErrorCode };