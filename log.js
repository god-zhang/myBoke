const fs = require('fs');
const globalConfig = require('./config');
const comJS = require('./utils/common');
const db_log_path = __dirname + globalConfig.log_path + globalConfig.db_log_name;
const err_log_path = __dirname + globalConfig.log_path + globalConfig.error_log_name;


function dbLog(data) {
    fs.writeFile(db_log_path, `${data}--->${comJS.getDate()}\n`, { flag: 'a+' }, function() {})
}

function errLog(data) {
    fs.writeFile(err_log_path, `${data}--->${comJS.getDate()}\n`, { flag: 'a+' }, function() {})
}

module.exports = {
    dbLog,
    errLog
}