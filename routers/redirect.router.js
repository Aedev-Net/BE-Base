'use strict';
const BaseRouter = require('./base.router');
const redirectService = require('../services/redirect.service');
const redirectController = require('../controllers/redirect.controller');

const { remoteServers } = require('../configs/app.config');
const { HttpMethod } = require('../common/constants');
const Rights = require('../common/rights');

class RedirectRouter extends BaseRouter {
    init() {
        this.route(HttpMethod.GET, '/intents', redirectController.redirect, [Rights.VqcViewIntents, Rights.BotViewIntents], remoteServers.nlp);
        this.route(HttpMethod.GET, '/intents/:id', redirectController.redirect, [Rights.VqcViewIntents, Rights.BotViewIntents], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents', redirectController.redirect, [Rights.VqcCreateIntents, Rights.BotCreateIntents], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/intents/:id', redirectController.redirect, [Rights.VqcUpdateIntents, Rights.BotUpdateIntents], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/intents/:id', redirectController.redirect, [Rights.VqcDeleteIntents, Rights.BotDeleteIntents], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/upload-file-nlp', redirectController.redirect, [Rights.VqcUploadIntents, Rights.BotUploadIntents], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/multi-test', redirectController.redirect, [Rights.BotTestSingleSentence, Rights.VqcTestSingleSentence], remoteServers.nlp);
        this.route(HttpMethod.GET, '/intents/train', redirectController.redirect, [Rights.BotTrainNlp, Rights.VqcTrainNlp], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/optimize', redirectController.redirect, [Rights.BotTrainNlp, Rights.VqcTrainNlp], remoteServers.nlp);
        this.route(HttpMethod.GET, '/intents/test', redirectController.redirect, [Rights.BotTestSingleSentence, Rights.VqcTestSingleSentence], remoteServers.nlp);
        this.route(HttpMethod.GET, '/intents/get-list-intent', redirectController.redirect, [Rights.VqcViewIntents, Rights.BotViewIntents], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/comment', redirectController.redirect, [Rights.VqcCommentIntents, Rights.BotCommentIntents], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/multi-test-json', redirectController.redirect, [Rights.BotTestMultipleSentences, Rights.VqcTestMultipleSentences], remoteServers.nlp);
        this.route(HttpMethod.GET, '/intents/statistic', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/nlp-histories/countTime', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/intents/tree', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        this.route(HttpMethod.GET, '/entity-types', redirectController.redirect, [Rights.VqcViewEntityTypes, Rights.BotViewEntityTypes], remoteServers.nlp);
        this.route(HttpMethod.POST, '/entity-types', redirectController.redirect, [Rights.VqcCreateEntityTypes, Rights.BotCreateEntityTypes], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/entity-types/:id', redirectController.redirect, [Rights.VqcUpdateEntityTypes, Rights.BotUpdateEntityTypes], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/entity-types/:id', redirectController.redirect, [Rights.VqcDeleteEntityTypes, Rights.BotDeleteEntityTypes], remoteServers.nlp);
        this.route(HttpMethod.GET, '/entity-types/get-list-entity', redirectController.redirect, [Rights.VqcViewEntityTypes, Rights.BotViewEntityTypes], remoteServers.nlp);

        this.route(HttpMethod.GET, '/sample-inputs', redirectController.redirect, [Rights.VqcViewSamples, Rights.BotViewSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sample-inputs/intent/:id', redirectController.redirect, [Rights.VqcViewSamples, Rights.BotViewSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sample-inputs/:id', redirectController.redirect, [Rights.VqcViewSamples, Rights.BotViewSamples], remoteServers.nlp);
        this.route(HttpMethod.POST, '/sample-inputs', redirectController.redirect, [Rights.VqcCreateSamples, Rights.BotCreateSamples], remoteServers.nlp);
        this.route(HttpMethod.POST, '/sample-inputs/copy-sample-by-intent-id', redirectController.redirect, [Rights.VqcCreateSamples, Rights.BotCreateSamples], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/sample-inputs/:id', redirectController.redirect, [Rights.VqcUploadSamples, Rights.BotUploadSamples], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/sample-inputs', redirectController.redirect, [Rights.VqcDeleteSamples, Rights.BotDeleteSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sample-inputs/download', redirectController.redirect, [Rights.VqcDowloadSamples, Rights.BotDowloadSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sample-inputs/get-by-content', redirectController.redirect, [Rights.VqcViewSamples, Rights.BotViewSamples], remoteServers.nlp);

        this.route(HttpMethod.GET, '/keywords', redirectController.redirect, [Rights.VqcViewNlpKeywords, Rights.BotViewNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.POST, '/keywords', redirectController.redirect, [Rights.VqcCreateNlpKeywords, Rights.BotCreateNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/keywords/:id', redirectController.redirect, [Rights.VqcUpdateNlpKeywords, Rights.BotUpdateNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/keywords/:id', redirectController.redirect, [Rights.VqcDeleteNlpKeywords, Rights.BotDeleteNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.GET, '/keywords/key', redirectController.redirect, [Rights.VqcViewNlpKeywords, Rights.BotViewNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.POST, '/keywords/upload', redirectController.redirect, [Rights.VqcUploadNlpKeywords, Rights.BotUploadNlpKeywords], remoteServers.nlp);

        this.route(HttpMethod.GET, '/stt-keywords', redirectController.redirect, [Rights.BotViewNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.POST, '/stt-keywords', redirectController.redirect, [Rights.BotCreateNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/stt-keywords', redirectController.redirect, [Rights.BotUpdateNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/stt-keywords/:id', redirectController.redirect, [Rights.BotDeleteNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.GET, '/stt-keywords/key', redirectController.redirect, [Rights.BotViewNlpKeywords], remoteServers.nlp);
        this.route(HttpMethod.POST, '/stt-keywords/upload', redirectController.redirect, [Rights.BotUploadNlpKeywords], remoteServers.nlp);

        this.route(HttpMethod.POST, '/status-trainings', redirectController.redirect, [Rights.BotTrainNlp, Rights.VqcTrainNlp], remoteServers.nlp);
        this.route(HttpMethod.GET, '/check-duplicate-sample', redirectController.redirect, [Rights.VqcViewSamples, Rights.BotViewSamples], remoteServers.nlp);

        this.route(HttpMethod.POST, '/speech-to-text', redirectController.uploadFileAudio, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/speech-to-text-silent', redirectController.uploadFileAudio, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/speech-to-text-cocall-silent', redirectController.uploadFileAudio, [Rights.Basic], remoteServers.nlp);
        //Agent-evaluation
        this.route(HttpMethod.POST, '/evaluation-agent', redirectController.uploadFileAudio, [Rights.VqcUploadAudios], remoteServers.nlp);
        this.route(HttpMethod.GET, '/evaluation-agents', redirectController.redirect, [Rights.VqcUploadAudios, Rights.VqcViewTranscript], remoteServers.nlp);
        this.route(HttpMethod.GET, '/evaluation-agents/statistic', redirectController.redirect, [Rights.VqcUploadCcCallReport], remoteServers.nlp);
        this.route(HttpMethod.GET, '/evaluation-quality-agents/statistic', redirectController.redirect, [Rights.VqcUploadCcCallReport], remoteServers.nlp);
        this.route(HttpMethod.GET, '/evaluation-error-agents/statistic', redirectController.redirect, [Rights.VqcUploadCcCallReport], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/evaluation-agents/comments', redirectController.redirect, [Rights.VqcAddComments], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/evaluation-agents/:id', redirectController.redirect, [Rights.VqcAddComments], remoteServers.nlp);
        this.route(HttpMethod.GET, '/evaluation-agents/:id', redirectController.redirect, [Rights.VqcViewUploadedAudios], remoteServers.nlp);
        //KPI-GROUP
        this.route(HttpMethod.GET, '/kpi-groups', redirectController.redirect, [Rights.VqcViewKpis], remoteServers.nlp);
        this.route(HttpMethod.POST, '/kpi-groups', redirectController.redirect, [Rights.VqcCreateKpiGroups], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/kpi-groups/:id', redirectController.redirect, [Rights.VqcDeleteKpiGroups], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/kpi-groups/:id', redirectController.redirect, [Rights.VqcUpdateKpiGroups], remoteServers.nlp);
        //KPI
        this.route(HttpMethod.POST, '/kpis', redirectController.redirect, [Rights.VqcViewKpis], remoteServers.nlp);
        this.route(HttpMethod.GET, '/kpis', redirectController.redirect, [Rights.VqcViewKpis], remoteServers.nlp);
        this.route(HttpMethod.GET, '/kpis/:id', redirectController.redirect, [Rights.VqcViewKpis], remoteServers.nlp);
        this.route(HttpMethod.GET, '/kpis/tree', redirectController.redirect, [Rights.VqcViewKpis], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/kpis/:id', redirectController.redirect, [Rights.VqcUpdateKpis], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/kpis/change-status/:id', redirectController.redirect, [Rights.VqcActivateKpis], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/kpis/:id', redirectController.redirect, [Rights.VqcDeleteKpis], remoteServers.nlp);

        this.route(HttpMethod.POST, '/stt', redirectController.uploadFileAudio, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/nlp-histories', redirectController.redirect, [Rights.BotViewTestingHistory, Rights.VqcViewTestingHistory], remoteServers.nlp);
        this.route(HttpMethod.GET, '/nlp-histories/count', redirectController.redirect, [Rights.BotViewTestingHistory, Rights.VqcViewTestingHistory], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/nlp-histories/:id', redirectController.redirect, [Rights.VqcUpdateSamples, Rights.BotUploadSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/history-activities', redirectController.redirect, [Rights.BotViewTestingHistory, Rights.VqcViewTestingHistory], remoteServers.nlp);
        this.route(HttpMethod.GET, '/history-activities-dashboard', redirectController.redirect, [Rights.VqcViewTestingHistory, Rights.BotViewTestingHistory], remoteServers.nlp);

        this.route(HttpMethod.POST, '/upload-file-csv', redirectController.uploadFileData, [Rights.BotUploadSamples], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sentiments-results', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/sentiments-results/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/accuracy', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        this.route(HttpMethod.GET, '/providers/enable-dictionary', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/custom-intents', redirectController.redirect, [Rights.BotViewIntents], remoteServers.nlp);
        this.route(HttpMethod.GET, '/get-parent-intent-by-id', redirectController.redirect, [Rights.BotViewIntents], remoteServers.nlp);
        this.route(HttpMethod.GET, '/contexts', redirectController.redirect, [Rights.VqcViewIntents, Rights.BotViewIntents], remoteServers.nlp);

        this.route(HttpMethod.GET, '/api/docker/status/:id', redirectController.redirect, [Rights.AdminViewNlpEngines], remoteServers.nlp);
        this.route(HttpMethod.GET, '/api/docker/restart/:id', redirectController.redirect, [Rights.AdminViewNlpEngines], remoteServers.nlp);
        this.route(HttpMethod.GET, '/api/docker/stop/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/api/docker/start/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.POST, '/status-trainings/change-status-by-provider-id', redirectController.redirect, [Rights.AdminViewNlpEngines], remoteServers.nlp);

        this.route(HttpMethod.GET, '/intents/tree', redirectController.redirect, [Rights.VqcViewIntents, Rights.BotViewIntents], remoteServers.nlp);

        this.route(HttpMethod.GET, '/stop-words', redirectController.redirect, [Rights.VqcViewStopWords, Rights.BotViewStopWords, Rights.AdminViewSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.POST, '/stop-words', redirectController.redirect, [Rights.VqcCreateStopWords, Rights.BotCreateStopWords, Rights.AdminCreateSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/stop-words', redirectController.redirect, [Rights.VqcUpdateStopWords, Rights.BotUpdateStopWords, Rights.AdminUpdateSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.GET, '/stop-words/engine-id', redirectController.redirect, [Rights.VqcViewStopWords, Rights.BotViewStopWords, Rights.AdminViewSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.GET, '/stop-words/:id', redirectController.redirect, [Rights.VqcViewStopWords, Rights.BotViewStopWords, , Rights.AdminViewSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/stop-words/:id', redirectController.redirect, [Rights.VqcDeleteStopWords, Rights.BotDeleteStopWords, Rights.AdminDeleteSystemStopWords], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/stop-words/engine-id', redirectController.redirect, [Rights.VqcUpdateStopWords, Rights.BotUpdateStopWords, Rights.AdminUpdateSystemStopWords], remoteServers.nlp);

        this.route(HttpMethod.GET, '/teen-codes', redirectController.redirect, [Rights.VqcViewTeenCodes, Rights.BotViewTeenCodes, Rights.AdminViewSystemTeenCodes], remoteServers.nlp);
        this.route(HttpMethod.POST, '/teen-codes', redirectController.redirect, [Rights.VqcCreateTeenCodes, Rights.BotCreateTeenCodes, Rights.AdminCreateSystemTeenCodes], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/teen-codes', redirectController.redirect, [Rights.VqcUpdateTeenCodes, Rights.BotUpdateTeenCodes, Rights.AdminUpdateSystemTeenCodes], remoteServers.nlp);
        this.route(HttpMethod.GET, '/teen-codes/:id', redirectController.redirect, [Rights.VqcViewTeenCodes, Rights.BotViewTeenCodes, Rights.AdminViewSystemTeenCodes], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/teen-codes/:id', redirectController.redirect, [Rights.VqcDeleteTeenCodes, Rights.BotDeleteTeenCodes, Rights.AdminDeleteSystemEntities], remoteServers.nlp);
        this.route(HttpMethod.POST, '/teen-codes/engine-id', redirectController.redirect, [Rights.VqcCreateTeenCodes, Rights.BotCreateTeenCodes, Rights.AdminCreateSystemTeenCodes], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/teen-codes/:id', redirectController.redirect, [Rights.VqcUpdateTeenCodes, Rights.BotDeleteTeenCodes, Rights.AdminUpdateSystemTeenCodes], remoteServers.nlp);

        this.route(HttpMethod.GET, '/sensitive-words', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bots', redirectController.redirect, [Rights.BotViewBot], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/bots/:id', redirectController.redirect, [Rights.BotViewIntegration], remoteServers.nlp);
        this.route(HttpMethod.GET, '/v1/bots', redirectController.redirect, [Rights.BotViewBot], remoteServers.nlp);
        this.route(HttpMethod.POST, '/v1/bots', redirectController.redirect, [Rights.BotCreateBot], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/v1/bots/:id', redirectController.redirect, [Rights.BotUpdateBot], remoteServers.nlp);
        this.route(HttpMethod.GET, '/v1/bots-org', redirectController.redirect, [Rights.BotViewBot], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/v1/bots/:id', redirectController.redirect, [Rights.BotDeleteBot], remoteServers.nlp);
        this.route(HttpMethod.POST, '/v1/bots/child', redirectController.redirect, [Rights.BotCreateChildBot], remoteServers.nlp);

        this.route(HttpMethod.GET, '/facebook/:id/webhook', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.POST, '/facebook/:id/webhook', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.GET, '/direct-facebook/webhook', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.POST, '/direct-facebook/webhook', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.POST, '/web/:id/webhook', redirectController.redirect, null, remoteServers.nlp);

        this.route(HttpMethod.GET, '/zalo/:id/webhook', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.POST, '/zalo/:id/webhook', redirectController.redirect, null, remoteServers.nlp);

        this.route(HttpMethod.POST, '/sessions', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        this.route(HttpMethod.GET, '/dataset/export', redirectController.redirect, [Rights.BotExportNlpDataset], remoteServers.nlp);
        this.route(HttpMethod.POST, '/dataset/restore', redirectController.redirect, [Rights.BotExportNlpDataset], remoteServers.nlp);
        this.route(HttpMethod.GET, '/dataset/vnlp-export', redirectController.redirect, [Rights.BotExportNlpDataset], remoteServers.nlp);
        this.route(HttpMethod.POST, '/dataset/vnlp-restore', redirectController.redirect, [Rights.BotExportNlpDataset], remoteServers.nlp);

        this.route(HttpMethod.POST, '/nlp/detect', redirectController.redirect, [Rights.BotTestSingleSentence], remoteServers.nlp);

        this.route(HttpMethod.GET, '/messages', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/messages/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        this.route(HttpMethod.GET, '/logs/actions', redirectController.redirect, [Rights.AdminViewListOfActionLogs], remoteServers.log);
        this.route(HttpMethod.GET, '/logs/agent-qc', redirectController.redirect, [Rights.AdminViewListOfQcLogs], remoteServers.log);

        this.route(HttpMethod.PUT, '/bot/users', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        this.route(HttpMethod.GET, '/system/entity-types', redirectController.redirect, [Rights.AdminViewSystemEntities], remoteServers.nlp);
        this.route(HttpMethod.GET, '/entity-types/:id', redirectController.redirect, [Rights.AdminViewSystemEntities], remoteServers.nlp);
        this.route(HttpMethod.POST, '/system/entity-types', redirectController.redirect, [Rights.AdminCreateSystemEntities], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/system/entity-types', redirectController.redirect, [Rights.AdminUpdateSystemEntities], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/system/entity-types/:id', redirectController.redirect, [Rights.AdminDeleteSystemEntities], remoteServers.nlp);

        this.route(HttpMethod.POST, '/bot/voice/:id', redirectController.redirect, [Rights.VqcUploadAudios, Rights.LabelboxUploadAudios], remoteServers.nlp);
        this.route(HttpMethod.POST, '/cc/upload', redirectController.redirect, [Rights.VqcUploadAudios, Rights.LabelboxUploadAudios], remoteServers.nlp);
        this.route(HttpMethod.POST, '/vqc/cc/upload', redirectController.redirect, [Rights.VqcUploadAudios, Rights.LabelboxUploadAudios], remoteServers.nlp);

        //test-sample
        this.route(HttpMethod.GET, '/test-datasets', redirectController.redirect, [Rights.VqcTestMultipleSentences, Rights.BotTestMultipleSentences], remoteServers.nlp);
        this.route(HttpMethod.GET, '/test-datasets/:id', redirectController.redirect, [Rights.VqcTestMultipleSentences, Rights.BotTestMultipleSentences], remoteServers.nlp);
        this.route(HttpMethod.POST, '/test-datasets', redirectController.redirect, [Rights.VqcTestMultipleSentences, Rights.BotTestMultipleSentences], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/test-datasets/:id', redirectController.redirect, [Rights.VqcTestMultipleSentences, Rights.BotTestMultipleSentences], remoteServers.nlp);

        this.route(HttpMethod.POST, '/test-samples/test', redirectController.redirect, [Rights.BotTestSingleSentence], remoteServers.nlp);

        this.route(HttpMethod.GET, '/prebuilds', redirectController.redirect, [Rights.BotViewPrebuiltDomains], remoteServers.nlp);
        this.route(HttpMethod.POST, '/prebuilds/import', redirectController.redirect, [Rights.BotImportPrebuiltDomains], remoteServers.nlp);

        // bot-setting
        this.route(HttpMethod.GET, '/bot-setting/persistent-menu', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.POST, '/bot-setting/persistent-menu', redirectController.redirect, [Rights.BotAddPersistentMenu], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/bot-setting/persistent-menu', redirectController.redirect, [Rights.BotUpdatePersistentMenu], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/bot-setting/persistent-menu/:id', redirectController.redirect, [Rights.BotDeletePersistentMenu], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/persistent-menu/send', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/disable', redirectController.redirect, [Rights.BotDisablePersistentMenu, Rights.BotDisableGreeting, Rights.BotDisableGetStarted, Rights.BotDisableIceBreakers, Rights.BotDisableWhitelistedDomains], remoteServers.nlp);

        this.route(HttpMethod.GET, '/bot-setting/greeting', redirectController.redirect, [Rights.BotGetGreeting], remoteServers.nlp);
        this.route(HttpMethod.POST, '/bot-setting/greeting', redirectController.redirect, [Rights.BotCreateGreeting], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/bot-setting/greeting', redirectController.redirect, [Rights.BotUpdateGreeting], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/bot-setting/greeting/:id', redirectController.redirect, [Rights.BotDeleteGreeting], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/greeting/send', redirectController.redirect, [Rights.BotSendGreeting], remoteServers.nlp);

        this.route(HttpMethod.GET, '/bot-setting/get-started', redirectController.redirect, [Rights.BotGetGetStarted], remoteServers.nlp);
        this.route(HttpMethod.POST, '/bot-setting/get-started', redirectController.redirect, [Rights.BotSaveGetStarted], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/get-started/send', redirectController.redirect, [Rights.BotSendGetStarted], remoteServers.nlp);

        this.route(HttpMethod.GET, '/bot-setting/ice-breakers', redirectController.redirect, [Rights.BotGetIceBreakers], remoteServers.nlp);
        this.route(HttpMethod.POST, '/bot-setting/ice-breakers', redirectController.redirect, [Rights.BotCreateIceBreakers], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/bot-setting/ice-breakers', redirectController.redirect, [Rights.BotUpdateIceBreakers], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/bot-setting/ice-breakers/:id', redirectController.redirect, [Rights.BotDeleteIceBreakers], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/ice-breakers/send', redirectController.redirect, [Rights.BotSendIceBreakers], remoteServers.nlp);

        this.route(HttpMethod.GET, '/bot-setting/whitelisted-domains', redirectController.redirect, [Rights.BotGetWhitelistedDomains], remoteServers.nlp);
        this.route(HttpMethod.POST, '/bot-setting/whitelisted-domains', redirectController.redirect, [Rights.BotUpdateWhitelistedDomains], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-setting/whitelisted-domains/send', redirectController.redirect, [Rights.BotSendWhitelistedDomains], remoteServers.nlp);

        this.route(HttpMethod.GET, '/history-activities/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        //transcripts
        this.route(HttpMethod.GET, '/transcripts/random', redirectController.redirect, [Rights.LabelboxViewTranscripts], remoteServers.tool);
        this.route(HttpMethod.POST, '/transcripts/upload', redirectController.redirect, [Rights.LabelboxUploadAudios], remoteServers.tool);
        this.route(HttpMethod.GET, '/transcripts', redirectController.redirect, [Rights.LabelboxUploadAudios], remoteServers.tool);
        this.route(HttpMethod.POST, '/transcripts/export-label-data', redirectController.redirect, [Rights.LabelboxExportReportToCsv], remoteServers.tool);
        this.route(HttpMethod.POST, '/transcripts/:id', redirectController.redirect, [Rights.LabelboxUploadAudios], remoteServers.tool);
        //correction-words
        this.route(HttpMethod.GET, '/correction-words', redirectController.redirect, [Rights.LabelboxViewCorectionWords], remoteServers.tool);
        this.route(HttpMethod.POST, '/correction-words', redirectController.redirect, [Rights.LabelboxCreateCorrectionWords], remoteServers.tool);
        this.route(HttpMethod.PUT, '/correction-words/:id', redirectController.redirect, [Rights.LabelboxUpdateCorrectionWords], remoteServers.tool);
        this.route(HttpMethod.DELETE, '/correction-words/:id', redirectController.redirect, [Rights.LabelboxDeleteCorrectionWords], remoteServers.tool);
        //genesys
        this.route(HttpMethod.GET, '/api/genesys', redirectController.redirect, null, remoteServers.nlp);

        //call-report
        this.route(HttpMethod.POST, '/call-report/upload', redirectController.redirect, [Rights.VqcUploadCcCallReport], remoteServers.nlp);
        this.route(HttpMethod.GET, '/call-report', redirectController.redirect, [Rights.VqcViewCcCallReport], remoteServers.nlp);

        // bot-users
        this.route(HttpMethod.GET, '/bot/users', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/bot/users/:id', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot/users/:userId', redirectController.redirect, [Rights.Basic], remoteServers.nlp);

        // chat histories
        this.route(HttpMethod.POST, '/messages', redirectController.redirect, [Rights.Basic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/messages/get-list-messages/:userId', redirectController.redirect, [Rights.Basic], remoteServers.nlp);


        //report-lable box
        this.route(HttpMethod.GET, '/report/data', redirectController.redirect, [Rights.LabelboxViewDataReport], remoteServers.tool);
        this.route(HttpMethod.GET, '/report/user', redirectController.redirect, [Rights.LabelboxViewUserReport], remoteServers.tool);

        //Retrain-data
        this.route(HttpMethod.GET, '/retrain-data', redirectController.redirect, [Rights.BotViewRetrainDatas], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/retrain-data/:id', redirectController.redirect, [Rights.BotUpdateRetrainData], remoteServers.nlp);
        this.route(HttpMethod.POST, '/retrain-data/add-samples', redirectController.redirect, [Rights.BotAddRetrainDataToSamples], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/retrain-data/:id', redirectController.redirect, [Rights.BotDeleteRetrainData], remoteServers.nlp);


        // room
        this.route(HttpMethod.GET, '/rooms/:id', redirectController.redirect, [Rights.LiveChatGetRoom], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/rooms/:id', redirectController.redirect, [Rights.LivechatEditRoom], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/:id/messages', redirectController.redirect, [Rights.LiveChatGetMessages], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/rooms/:id/stop', redirectController.redirect, [Rights.LiveChatEditRoom], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/rooms/:id/start', redirectController.redirect, [Rights.LiveChatEditRoom], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/unassigned', redirectController.redirect, [Rights.LivechatGetListRooms], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/assigned', redirectController.redirect, [Rights.LivechatGetListRooms], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/own', redirectController.redirect, [Rights.LivechatGetListRooms], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/unassigned/count', redirectController.redirect, [Rights.LivechatGetListRooms], remoteServers.livechat);
        this.route(HttpMethod.GET, '/rooms/:id/messages/keyword', redirectController.redirect, [Rights.LivechatGetListRooms], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/rooms/:id/join', redirectController.redirect, [Rights.LiveChatEditRoom], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/rooms/:id/left', redirectController.redirect, [Rights.LiveChatEditRoom], remoteServers.livechat);
        this.route(HttpMethod.GET, '/tags', redirectController.redirect, [Rights.LivechatGetTags], remoteServers.livechat);

        //bot-statistic
        this.route(HttpMethod.POST, '/bot-statistics', redirectController.redirect, null, remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-statistics', redirectController.redirect, [Rights.LivechatGetBotStatistic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-statistics/intents', redirectController.redirect, [Rights.LivechatGetBotStatistic], remoteServers.nlp);
        this.route(HttpMethod.GET, '/bot-statistics/month', redirectController.redirect, [Rights.BotGetStatisticByMonth], remoteServers.nlp);

        // Notifications
        this.route(HttpMethod.GET, '/notifications', redirectController.redirect, [Rights.LivechatGetNotifications], remoteServers.livechat);
        this.route(HttpMethod.GET, '/notifications/count', redirectController.redirect, [Rights.LivechatGetNotifications], remoteServers.livechat);
        this.route(HttpMethod.PUT, '/notifications/:id', redirectController.redirect, [Rights.LivechatEditNotification], remoteServers.livechat);

        //Response
        this.route(HttpMethod.GET, '/responses', redirectController.redirect, [Rights.BotGetResponse], remoteServers.nlp);
        this.route(HttpMethod.GET, '/responses/:id', redirectController.redirect, [Rights.BotGetResponse], remoteServers.nlp);
        this.route(HttpMethod.PUT, '/responses/:id', redirectController.redirect, [Rights.BotUpdateResponse], remoteServers.nlp);
        this.route(HttpMethod.POST, '/responses', redirectController.redirect, [Rights.BotCreateResponse], remoteServers.nlp);
        this.route(HttpMethod.DELETE, '/responses/:id', redirectController.redirect, [Rights.BotDeleteResponse], remoteServers.nlp);
    }
}

module.exports = new RedirectRouter();
