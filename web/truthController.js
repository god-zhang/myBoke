const apiMap = new Map();
const request = require('request');
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');


const TruthDao = require('../dao/truthDao');

//每日一句展示以及写入数据库
function truth() {
    request({
        url: 'https://api.ooopn.com/ciba/api.php?type=json',
        method: 'GET',
        headers: {
            "content-type": 'application/json',
        }
    }, function(err, resp, body) {
        if (!err) {
            const newBody = JSON.parse(body);
            TruthDao.insertTruth(newBody.date, newBody.ciba, 0, function(insertres) {
                wlog.dbLog('每日一句插入成功');
            }, function(err) {
                wlog.errLog('插入失败')
            })
        } else {
            wlog.errLog('每日一句请求出错');
            throw new Error('每日一句请求出错');
        }
    })
}

//每日一句查询带分页
function queryAllTruthByPage(req, res) {
    const params = url.parse(req.url, true).query;
    TruthDao.queryAllTruthByPage(parseInt(params.offset), parseInt(params.limit), (result) => {
        TruthDao.countTruth((count) => {
            if (result.length == 0) {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ total: 0, rows: result }))
                res.end();
            } else {
                // console.log(result);
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ total: parseInt(count[0].count_truth), rows: result }))
                res.end();
            }
        }, (counterr) => {
            wlog.errLog('每日一句数量查询出错' + counterr);
            throw new Error('每日一句数量查询出错' + counterr);
        })
    }, (err) => {
        wlog.errLog('每日一句请求出错' + err);
        throw new Error('每日一句请求出错' + err);
    })
}

//查询所有每日一句
function queryTopTruth(req, res) {
    TruthDao.queryTopTruth((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result[0]))
        res.end();
    }, (err) => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify(err))
        res.end();
    })
}

//删除每日一句
function deleteTruth(req, res) {
    req.on('data', (resp) => {
        const id = parseInt(resp.toString().split('=')[1]);
        TruthDao.deleteTruth(id, (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('删除成功'));
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify('删除失败'));
            res.end();
        })
    })
}

//更新每日一句的置顶
function updateTop(req, res) {
    const params = url.parse(req.url, true).query;
    TruthDao.queryTopTruth((topres) => {
        if (topres.length != 0) {
            TruthDao.updateTop(0, parseInt(topres[0].id), (result) => {}, (err) => {})
        }
        TruthDao.updateTop(parseInt(params.is_top), parseInt(params.id), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify(`ID ${params.id}置顶成功`));
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify(`ID ${params.id}置顶失败`));
            res.end();
        })
    }, (toperr) => {})
}

apiMap.set('/api/truth', truth)
apiMap.set('/api/allTruthByPage', queryAllTruthByPage)
apiMap.set('/api/deleteTruth', deleteTruth)
apiMap.set('/api/queryTopTruth', queryTopTruth)
apiMap.set('/api/updateTop', updateTop)



module.exports.apiMap = apiMap;