const mailConfig = Object.freeze({
    service: "Gmail",
    options: {
        user: process.env.EMAIL_USER || "support@support",
        pass: process.env.EMAIL_PASS || "emailpass",
        from: process.env.EMAIL_FROM || "support@support",
    },

    adminEmail: "someone@gmail.com"
});

module.exports = mailConfig;