'use strict'

function TooTLogger() {
    this.log4js = {};
    this.logger = {};
    this.level = '';
}

TooTLogger.prototype.name = 'moiiom-logger';

TooTLogger.prototype.init = function () {
    try {
        this.log4js = require('log4js');

        this.log4js.configure({
            appenders: { TooT: { type: 'dateFile', filename: './logs/debug.log' } },
            categories: { default: { appenders: ['TooT'], level: 'error' } }
        });

        this.logger = this.log4js.getLogger('TooT');

        TooTLogger.getInstance().logInfo('TooTLoger.init','init success')
    } catch (error) {
        console.log(`[TooTLogger.init] error : ${error}`);
    }
}

TooTLogger.prototype.logDebug = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'debug';
    this.logger.debug(logInfo);
};

TooTLogger.prototype.logInfo = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'info';
    this.logger.info(logInfo);
};

TooTLogger.prototype.logWarn = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'warn';
    this.logger.warn(logInfo);
};

TooTLogger.prototype.logError = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'error';
    this.logger.error(logInfo);
};

TooTLogger.prototype.logFatal = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'fatal';
    this.logger.fatal(logInfo);
};

TooTLogger.getInstance = function () {
    if (!TooTLogger.instance) {
        TooTLogger.instance = new TooTLogger();
        TooTLogger.instance.init()
    }
    return TooTLogger.instance;
};

module.exports = TooTLogger;