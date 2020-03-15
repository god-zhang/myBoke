const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const common = require('../utils/common');

const pageViewsDao = require('../dao/pageViewsDao');

//查询七天的浏览量
function getTop7Views(req, res) {
    pageViewsDao.queryViewsTop7((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result))
        res.end();
    }, err => {
        wlog.errLog('查询七天浏览量失败' + err);
    })
}


function insertViews(req, res) {
    pageViewsDao.insertViews(0, common.getDate(), (result) => {
        wlog.dbLog('插入一条浏览记录成功');
    }, err => {
        wlog.errLog('插入一条浏览记录失败' + err);
    })
}
apiMap.set('/api/getTop7Views', getTop7Views);
apiMap.set('/api/insertViews', insertViews);

module.exports.apiMap = apiMap;