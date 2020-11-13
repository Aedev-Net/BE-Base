const nodemailer = require("nodemailer");
const fs = require('fs');
const mailConfig = require('../../configs/mail.config');
const appConfig = require('../../configs/app.config');

function send(service, sender, password, receiver, subject, content) {
    const smtpTransport = nodemailer.createTransport({
        service: service,
        auth: {
            user: sender,
            pass: password,
        },
        pool: {
            pool: true,
        },
    });

    const mailOptions = {
        to: receiver,
        subject: subject,
        html: content,
        from: mailConfig.options.from,
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        }
    });
}

function sendFromSystem(receiver, subject, content) {
    const service = mailConfig.service;
    const sender = mailConfig.options.user;
    const password = mailConfig.options.pass;

    send(service, sender, password, receiver, subject, content);
}

module.exports.sentEmailResetPasswordToProvider = (toEmail, name, username, token, clientUrl) => {
    const subject = "[GOnJOY]Reset Password";
    fs.readFile('temp/reset_password_template.txt', 'utf8', function (err, data) {
        if (err) return;
        var content = data.replace(/#service-provider-name#/g, name);
        content = content.replace(/#service-provider-username#/g, username);
        content = content.replace(/#reset-password-url#/g, `${clientUrl}/#/reset/${username}?token=${token}`)
        sendFromSystem(toEmail, subject, content);
    });
};

module.exports.resetPassword = (toEmail, pass) => {
    const subject = "[GOnJOY] Reset password";
    const content = "Hello,<br> Here is your new password. Please change after login to the system. <br> Password: <strong>" + pass + "</strong>";

    sendFromSystem(toEmail, subject, content);
}


module.exports.createUser = (toEmail, pass) => {
    const subject = "[VNLP] Created User";
    const content = "Welcome to VNLP System, your account has been successfully created. <br>Now you can sign in with your current Password: <strong>" + pass + "</strong>";

    sendFromSystem(toEmail, subject, content);
}

module.exports.sendUserInvitation = (info) => {
    if (!info) return;
    const now = new Date();
    const expiredTime = new Date(now.getTime() + info.expiredTime * 1000);
    const subject = '[VNLP] Invitation to create your new account';
    const url = `${info.domain}#/user/create/?t=${info.token}`;
    const content = `You have been invited by <b>${info.name}</b> to join organization <b>${info.organizationName}</b> with role <b>${info.roleName}</b> on VNLP System.
    <br>By joining this organization, your name and email address will be visible to other members of the organization.
    <br>Please click <a href=${url} style='font-weight: bold'>here</a> to create your new account.
    <br>Your token will be expired at ${expiredTime}.
    <br><br>Thanks and regards,
    <br>VNLP Team.`;
    sendFromSystem(info.email, subject, content);
}
