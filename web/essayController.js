const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');
const common = require('../utils/common');

const essayDao = require('../dao/essayDao');


//随笔插入
function insertEssay(req, res) {
    let currentData = "";
    req.on("data", function(data) {
        currentData += data;
    });
    req.on("end", function() {
        const params = JSON.parse(currentData.toString());
        essayDao.insertEssay(params.content, common.getDate(), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('随笔插入成功'))
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify(`随笔插入失败`))
            res.end();
            wlog.errLog(`随笔插入失败--${err}`);
        })
    });
}

//随笔查询
function queryEssays(req, res) {
    essayDao.queryEssay((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result))
        res.end();
    }, err => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify(`随笔查询失败`))
        res.end();
        wlog.errLog(`随笔查询失败--${err}`);
    })
}

//随笔查询带分页
function queryEssayByPage(req, res) {
    const params = url.parse(req.url, true).query;
    essayDao.queryEssayByPage(parseInt(params.offset), parseInt(params.limit), (result) => {
        essayDao.countEssay((countEssay) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify({ total: parseInt(countEssay[0].count_essay), rows: result }))
            res.end();
        }, (countErr) => {
            wlog.errLog(`随笔计数失败--${countErr}`);
        })
    }, err => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify(`随笔查询失败`))
        res.end();
        wlog.errLog(`随笔查询失败--${err}`);
    })
}

//删除随笔
function deleteEssay(req, res) {
    req.on('data', (data) => {
        const id = parseInt(data.toString().split('=')[1]);
        essayDao.deleteEssay(id, (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify(`删除随笔 ${id} 成功`))
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify(`删除随笔 ${id} 失败`))
            res.end();
            wlog.errLog(`随笔删除失败--${err}`);
        })
    })
}


apiMap.set('/api/insertEssay', insertEssay);
apiMap.set('/api/queryEssays', queryEssays);
apiMap.set('/api/queryEssayByPage', queryEssayByPage);
apiMap.set('/api/deleteEssay', deleteEssay);

module.exports.apiMap = apiMap;