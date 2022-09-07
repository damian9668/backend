const log4js = require("log4js");
log4js.configure({
    appenders: {
        miLoggerConsole: { type: 'console' },
        miLoggerFile1: { type: 'file', filename: 'logs/info.log' },
        miLoggerFile2: { type: 'file', filename: 'logs/warn.log' },
        miLoggerFile3: { type: 'file', filename: 'logs/error.log' },
    },
    categories: {
        default: { appenders: ['miLoggerConsole'], level: 'trace' },
        consola: { appenders: ['miLoggerConsole'], level: 'all' },
        archivo: { appenders: ['miLoggerFile1'], level: 'info' },
        archivo2: { appenders: ['miLoggerFile2'], level: 'warn' },
        archivo3: { appenders: ['miLoggerFile3'], level: 'error' },
        todos: { appenders: ['miLoggerConsole', 'miLoggerFile1', 'miLoggerFile2','miLoggerFile3'], level: 'error' }
    }
});
const loggerInfo = log4js.getLogger('archivo');
const loggerWarn = log4js.getLogger('archivo2');
const loggerError = log4js.getLogger('archivo3');
const loggerConsola = log4js.getLogger('consola');

module.exports = {
    loggerInfo,
    loggerWarn,
    loggerError,
    loggerConsola
}