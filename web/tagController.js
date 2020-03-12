const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');
const common = require('../utils/common');

const tagDao = require('../dao/tagDao');

//tag插入
function insertTag(req, res) {
    const params = url.parse(req.url, true).query;
    tagDao.insertTag(params.name, common.getDate(), (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify('插入成功'))
        res.end();
    }, (err) => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify('插入失败'))
        res.end();
        wlog.errLog('标签插入错误' + err);
    })
}

//tag查询
function queryTags(req, res) {
    tagDao.queryTags((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result))
        res.end();
    }, (err) => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify('查询失败'))
        res.end();
        wlog.errLog('标签查询失败' + err);
    })
}

//tag删除
function deleteTag(req, res) {
    req.on('data', function(data) {
        const id = data.toString().split('=')[1];
        tagDao.deleteTag(parseInt(id), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('删除成功'))
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify('删除失败'))
            res.end();
            wlog.errLog('标签删除失败' + err);
        })
    })
}

function countByTagId(req, res) {
    const params = url.parse(req.url, true).query;
    tagDao.countByTagId(parseInt(params.tag_id), (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result[0].countTag))
        res.end();
    }, (err) => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify('计算数量失败'))
        res.end();
        wlog.errLog('计算数量失败' + err);
    })
}

apiMap.set('/api/insertTag', insertTag);
apiMap.set('/api/queryTags', queryTags);
apiMap.set('/api/deleteTag', deleteTag);
apiMap.set('/api/countByTagId', countByTagId);

module.exports.apiMap = apiMap;