'use strict';

const TokenType = Object.freeze({
    User: "user",
    App: "app",
});

const ResponseMessage = Object.freeze({
    NotFoundDiscount: "Cannot found this discount",
    SavedSuccessfully: "saved_successfully",
    DeletedSuccessfully: "Deleted successfully",
    SentSuccessfully: "Sent successfully",
    SomethingGoesWrong: "Oops, something goes wrong",
    RegisterSuccessfully: "Register successfully, please verify your email before login",
    UsernameExistingError: "Username is existing",
    LinkNotExistingError: "Oops, your link is not existing",
    VerifyEmailSuccessfully: "Verify email successfully. Thanks for be our partner",
    EmailVerified: "Email is verified",
    AccountNotExisting: "Opps, this account is not existing",
    CheckEmailMessage: "Check your email to get new password",
    OldPasswordNotCorrect: "Opps, old password is not correct",
    ChangedPasswordSuccessfully: "Changed password successfully",
    AccessDenied: "Access Denied",
    TokenNull: "Token is null",
    TokenValid: "Token is valid",
    TokenInvalid: "Token is invalid",
    TokenExpired: "Token is expired",
    ProviderIDInvalid: "Provider ID is invalid",
    CustomerIDInvalid: "Customer ID is invalid",
    NotFoundProvider: "Cannot found this provider",
    NotFoundPlaceId: "Cannot found this placeId",
    NotFoundAccount: "Cannot found this account",
    NotFoundShip: "Cannot found this ship",
    NotFoundUnit: "Cannot found this unit",
    NotAllowSendNoWaitingMessage: "Cannot update the non-waiting message",
    NotAllowCancelNonePendingShip: "Cannot cancel inprogress ship",
    NotAllowAcceptOrRefuseInprogressShip: "not_allow_accept_or_refuse_in_progress",
    NotAllowCancelNonePendingBook: "Cannot cancel inprogress book",
    NotAllowAcceptOrRefuseInprogressBook: "Đơn hàng đã được xử lý. Thao tác của bạn bị hủy bỏ.",
    QRCodeUsed: "this-qr-code-was-used",
    NoActivePromotion: "No active promotion",
    MenuNameExistingError: "Menu is existing",
    NotFoundFbIDs: "No fbId found",
    InvalidMessage: "Invalid message",
    NotFoundLoyaltyProgram: "Loyalty program not found",
    AccountExpiredFreeTrial: 'Account is expired free trial',
    InternalServerError: 'Internal Server Error',
    BadRequest: 'Bad Request',
    Unauthorized: 'Unauthorized',
    Forbidden: 'Forbidden',
    ResourceNotFound: 'Resource Not Found',
    ServiceUnavilable: 'Service Unavilable',
});

const Action = Object.freeze({
    //User
    CreateUser: 'Create User',
    UpdateUser: 'Update User',
    DeleteUser: 'Delete User',
    ChangeStatusUser: 'Change Status User',
    //Organization
    CreateOrganization: 'Create Organization',
    UpdateOrganization: 'Update Organization',
    DeteteOrganization: 'Delete Organization',
    ChangeStatusOrganization: 'Change Status Organization',
    //Role
    CreateRole: 'Create Role',
    UpdateRole: 'Update Role',
    //Localization
    CreateLocalization: 'Create Localization',
    UpdateLocalization: 'Update Localization',
    // Tutorial 
    CreateTutorial: 'Create Tutorial',
    UpdateTutorial: 'Update Tutorial',
    DeleteTutorial: 'Delete Tutorial',
    //Stop-word
    CreateStopWord: 'Create Stop Word',
    UpdateStopWord: 'Update Stop Word',
    DeleteStopWord: 'Delete Stop Word',
    //TeenCode
    CreateTeenCode: 'Create Teen Code',
    UpdateTeenCode: 'Update Teen Code ',
    DeleteTeenCode: 'Delete Teen Code',
    //NLP-Engine
    CreateNLPEngine: 'Create NLP Engine',
    UpdateNLPEngine: 'Update NLP Engine',
    DeleteNLPEngine: 'Delete NLP Engine',
    //Login-Logout
    LogIn: 'Log In',
    LogOut: 'Log Out',
    //General-Setting
    SentInviteEmail: 'sent_invite_email',
    ChangeUserRole: 'change_role_user',
    //User-feedback
    CreateUserFeedback: 'Create User Feedback',
    VerifyUserFeedback: 'Verify User Feedback',
    DeleteUserFeedback: 'Delete User Feedback',
});

const Server = Object.freeze({
    ServerNLp: 'Node NLP',
    ServerAuth: 'Node Auth',
});

const HttpMethod = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
});

const NlpStatus = Object.freeze({
    Idle: 0,
    Uploading: 1,
    Training: 2,
});

const DockerStatus = Object.freeze({
    Exited: 'exited',
    Running: 'running',
    NotFound: 'Not found',
});

const Url = Object.freeze({
    ChangePassword: '/auth/change-password',
});

const Organization = Object.freeze({
    System: 'System',
});

const Role = Object.freeze({
    Tool: 'Tool',
    Admin: 'Admin',
});

const DefaultConfidentRange = Object.freeze({
    GoodFrom: 80,
    WarningFrom: 50,
});

const FeedbackStatus = Object.freeze({
    Verified: 1,
    Unverified: 0,
});

const REDIS_KEY = Object.freeze({
    Localizations: 'localizations',
});

module.exports = Object.freeze({
    TokenType,
    ResponseMessage,
    HttpMethod,
    NlpStatus,
    DockerStatus,
    Url,
    Organization,
    Role,
    Action,
    Server,
    DefaultConfidentRange,
    FeedbackStatus,
    REDIS_KEY,
});