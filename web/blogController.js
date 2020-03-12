const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');
const common = require('../utils/common');
const fs = require('fs');
const blogDao = require('../dao/blogDao');

//插入博客
function insertArticle(req, res) {
    setCoverUrl(req, (coverUrl) => {
        const params = req.body;
        blogDao.insertArticle(params.title, params.content, params.author, common.getDate(), 0, common.getDate(), params.type, coverUrl, params.introduce, params.tags, 0, params.tagIds, (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify('插入成功'))
            res.end();
            insertBlogAndTags(result.insertId, params.tagIds);
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify('插入失败'))
            res.end();
            wlog.errLog('博客插入失败' + err);
        })
    })
}

//设置封面连接
function setCoverUrl(req, success) {
    const extName = req.file.originalname.split('.')[1];
    const newName = req.file.filename + '.' + extName;
    fs.rename(req.file.destination + req.file.filename, req.file.destination + 'articles/' + newName, (err) => {
        if (err) {
            console.log(err);
        } else {
            let domain = req.headers['referer'].match(/^(\w+:\/\/)?([^\/]+)/i)[0] + '/';
            const coverUrl = domain + 'articles/' + newName;
            success(coverUrl);
        }
    })
}

//插入博客标签映射表
function insertBlogAndTags(articleId, tagIds) {
    const tagsArr = tagIds.split(',');
    for (let i = 0; i < tagsArr.length; i++) {
        blogDao.insertBlogAndTags(articleId, parseInt(tagsArr[i]), (result) => {}, (err) => {})
    }

}

//博客查询
function queryArticles(req, res) {
    const params = url.parse(req.url, true).query;
    if (params.search) {
        blogDao.queryArticlesByTitle(params.search, parseInt(params.offset), parseInt(params.limit), (result) => {
            blogDao.countArticlesByTitle(params.search, (countres) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ total: parseInt(countres[0].countTitle), rows: result }))
                res.end();
            }, (couterr) => {
                wlog.errLog('博客总数计算失败' + couterr);
            })
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify('查询失败'))
            res.end();
            wlog.errLog('博客查询失败' + err);
        })
    } else {
        blogDao.queryArticles(parseInt(params.offset), parseInt(params.limit), (result) => {
            blogDao.countArticles((countres) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ total: parseInt(countres[0].coutArt), rows: result }))
                res.end();
            }, (couterr) => {
                wlog.errLog('博客总数计算失败' + couterr);
            })
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify('查询失败'))
            res.end();
            wlog.errLog('博客查询失败' + err);
        })
    }
}


//根据id查询博客
function queryArticleById(req, res) {
    const id = url.parse(req.url, true).query.id;
    blogDao.queryArticleById(parseInt(id), (result) => {
        if (result.length > 0) {
            blogDao.countCommentsById(parseInt(id), (countNum) => {
                if (countNum.length > 0) {
                    blogDao.updateViewsAndComments(parseInt(result[0].views + 1), parseInt(countNum[0].countComments), parseInt(id), (viewsres) => {
                        res.writeHead(200, globalConfig['access_header']);
                        res.write(JSON.stringify(result[0]))
                        res.end();
                    }, (viewserr) => {
                        wlog.errLog('博客views和comments_num更新失败' + viewserr);
                    })
                }
            }, counterr => {
                wlog.errLog('博客评论数查询失败更新失败' + counterr);
            })
        } else {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify({ msg: 'notfound' }))
            res.end();
        }
    }, (err) => {
        wlog.errLog('博客内容查询失败' + err);
    })
}

//根据id查询博客内容,以便更改
function queryArticleContentById(req, res) {
    const id = url.parse(req.url, true).query.id;
    blogDao.queryArticleContentById(parseInt(id), (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result[0]))
        res.end();
    }, (err) => {
        wlog.errLog('博客内容查询失败' + err);
    })
}

//查询热门文章
function queryArticlesByViews(req, res) {
    blogDao.queryArticlesByViews((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result))
        res.end();
    }, err => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify('查询失败'))
        res.end();
        wlog.errLog('博客查询失败' + err);
    })
}

//编辑博客内容
function editArticleContent(req, res) {
    let currentData = '';
    req.on('data', (data) => {
        currentData += data;
    })

    req.on('end', () => {
        const params = JSON.parse(currentData.toString());
        const id = parseInt(params.id);
        const content = params.content;
        blogDao.editArticleContent(id, content, common.getDate(), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify(`博客 ${id} 编辑成功`))
            res.end();
        }, (err) => {
            res.writeHead(500, globalConfig['access_header']);
            res.write(JSON.stringify(`博客 ${id} 编辑失败`))
            res.end();
            wlog.errLog(`博客 ${id} 编辑失败--${err}`);
        })
    })
}


// 通过标签查询文章
function queryArticlesByTag(req, res) {
    const params = url.parse(req.url, true).query;
    blogDao.queryArticleIdByTagId(parseInt(params.tagId), (result) => {
        if (result.length > 0) {
            const idArr = [];
            for (let i = 0; i < result.length; i++) {
                idArr.push(parseInt(result[i].article_id))
            }
            blogDao.queryArticlesById(idArr, parseInt(params.offset), parseInt(params.limit), (resIds) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ total: idArr.length, rows: resIds }))
                res.end();
            }, errIds => {
                res.writeHead(500, globalConfig['access_header']);
                res.write(JSON.stringify(`tag查询博客失败`))
                res.end();
                wlog.errLog(`tag查询博客失败` + errIds);
            })
        }
    }, (err) => {})
}

//搜索标题展示在搜索框下
function searchTitles(req, res) {
    const params = url.parse(req.url, true).query;
    blogDao.searchTitles(params.title, (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(result))
        res.end();
    }, err => {
        res.writeHead(500, globalConfig['access_header']);
        res.write(JSON.stringify(`搜索 ${params.title} 失败`))
        res.end();
        wlog.errLog(`搜索 ${params.title} 失败` + err);
    })
}

//删除文章
function deleteArticle(req, res) {
    req.on('data', (data) => {
        const id = parseInt(data.toString().split('=')[1]);
        blogDao.queryArticleById(id, (qres) => {
            if (qres.length > 0) {
                const imgName = qres[0].cover.split('/articles/')[1];
                blogDao.deleteArticle(id, (result) => {
                    blogDao.deleteTAMapping(id, (mapres) => {
                        fs.unlink(`./files/articles/${imgName}`, () => {
                            res.writeHead(200, globalConfig['access_header']);
                            res.write(JSON.stringify(`删除文章 ${id} 成功`))
                            res.end();
                        })
                    }, (maperr) => {
                        res.writeHead(500, globalConfig['access_header']);
                        res.write(JSON.stringify(`删除文章 ${id} 失败`))
                        res.end();
                        wlog.errLog(`删除关系失败` + maperr);
                    })
                }, err => {
                    wlog.errLog(`删除文章 ${id} 失败` + err);
                })
            }
        }, (qerr) => {
            wlog.errLog(`查询文章 ${id} 失败` + qerr);
        })

    })
}

apiMap.set('/api/insertArticle', insertArticle);
apiMap.set('/api/queryArticles', queryArticles);
apiMap.set('/api/queryArticleById', queryArticleById);
apiMap.set('/api/queryArticlesByViews', queryArticlesByViews);
apiMap.set('/api/queryArticleContentById', queryArticleContentById);
apiMap.set('/api/editArticleContent', editArticleContent);
apiMap.set('/api/queryArticlesByTag', queryArticlesByTag);
apiMap.set('/api/searchTitles', searchTitles);
apiMap.set('/api/deleteArticle', deleteArticle);

module.exports.apiMap = apiMap;