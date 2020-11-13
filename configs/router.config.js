'use strict';

const routers = Object.freeze([
    {
        path: '/localizations',
        router: 'routers/localization.router',
    },
    {
        path: '/v1/bot',
        router: 'routers/bot.router',
    },
    {
        path: '/v1/auth',
        router: 'routers/auth.router',
    },
    {
        path: '/auth',
        router: 'routers/auth.router',
    },
    {
        path: '/users',
        router: 'routers/user.router'
    },
    {
        path: '/feedbacks',
        router: 'routers/feedback.router'
    },
    {
        path: '/api/v1',
        router: 'routers/redirect.router',
    },
    {
        path: '/api/v1/nlp',
        router: 'routers/redirect.router',
    },
    {
        path: '/api/v2',
        router: 'routers/redirect.router',
    },
    {
        path: '/v1',
        router: 'routers/redirect.router',
    },
    {
        path: '/organizations',
        router: 'routers/organization.router',
    },
    {
        path: '/roles',
        router: 'routers/role.router'
    },
    {
        path: '/nlp-engines',
        router: 'routers/nlp-engine.router'
    },
    {
        path: '/tutorials',
        router: 'routers/tutorial.router'
    },
    {
        path: '/statistic',
        router: 'routers/statistic.router',
    },
    {
        path: '/travel',
        router: 'routers/travel.router',
    },
    {
        path: '/v2',
        router: 'routers/redirect.router',
    },
    {
        path: '',
        router: 'routers/redirect.router',
    },
]);

module.exports = routers;
