const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');
const common = require('../utils/common');

const emojisDao = require('../dao/emojisDao');


//批量添加表情
function insertEmojis(req, res) {
    req.on('data', (data) => {
        const emojisArr = JSON.parse(data.toString());
        for (let i = 0; i < emojisArr.length; i++) {
            const content = `<img src='${emojisArr[i].src}' alt='${emojisArr[i].alt}'/>`
            emojisDao.insertEmojis(emojisArr[i].alt, emojisArr[i].src, content, (result) => {
                if (i == emojisArr.length - 1) {
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify('插入表情成功'));
                    res.end();
                }
            }, err => {
                wlog.errLog('插入表情失败' + err);
            })
        }
    })
}

function queryEmoji(req, res) {
    const params = url.parse(req.url, true).query;
    emojisDao.queryEmoji(params.alt ? params.alt : undefined, (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result));
        res.end();
    }, err => {
        wlog.errLog('插入查询失败' + err);
    })
}


function deleteEmoji(req, res) {
    req.on('data', (data) => {
        const id = data.toString().split('=')[1];
        emojisDao.deleteEmoji(parseInt(id), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('表情删除成功'));
            res.end();
        }, err => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('表情删除失败'));
            res.end();
            wlog.errLog('插入查询失败' + err);
        })
    })
}


apiMap.set('/api/insertEmojis', insertEmojis);
apiMap.set('/api/queryEmoji', queryEmoji);
apiMap.set('/api/deleteEmoji', deleteEmoji);

module.exports.apiMap = apiMap;