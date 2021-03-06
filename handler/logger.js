'use strict'

function Logger() {
    this.log4js = {};
    this.logger = {};
    this.level = '';
}

Logger.prototype.name = 'moiiom-logger';

Logger.prototype.init = function () {
    try {
        this.log4js = require('log4js');

        this.log4js.configure({
            appenders: { ToT: { type: 'dateFile', filename: './logs/debug.log' } },
            categories: { default: { appenders: ['ToT'], level: 'error' } }
        });

        this.logger = this.log4js.getLogger('ToT');

        Logger.getInstance().logInfo('TooTLoger.init','init success')
    } catch (error) {
        console.log(`[Logger.init] error : ${error}`);
    }
}

Logger.prototype.logDebug = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'debug';
    this.logger.debug(logInfo);
};

Logger.prototype.logInfo = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'info';
    this.logger.info(logInfo);
};

Logger.prototype.sql = function (content) {
    this.logger.level = '';
    this.logger.info(content);
};

Logger.prototype.logWarn = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'warn';
    this.logger.warn(logInfo);
};

Logger.prototype.logError = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'error';
    this.logger.error(logInfo);
};

Logger.prototype.logFatal = function (methodName,content) {
    const logInfo = `[${methodName}]--${content}`;
    this.logger.level = 'fatal';
    this.logger.fatal(logInfo);
};

Logger.getInstance = function () {
    if (!Logger.instance) {
        Logger.instance = new Logger();
        Logger.instance.init()
    }
    return Logger.instance;
};

module.exports = Logger;