const dbutil = require('./dbutil');

//博客插入
function insertArticle(title, content, author, ctime, views, utime, type, cover, introduce, tags, commentsNum, tagIds, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into articles (`title`,`content`,`author`,`ctime`,`views`,`utime`,`type`,`cover`,`introduce`,`tags`,`comments_num`,`tagIds`) values (?,?,?,?,?,?,?,?,?,?,?,?);';
    const params = [title, content, author, ctime, views, utime, type, cover, introduce, tags, commentsNum, tagIds]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}


//插入博客标签映射表
function insertBlogAndTags(blogId, tagId, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into tag_article_mapping (`article_id`,`tag_id`) values (?,?);';
    const params = [blogId, tagId]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//博客所有查询根据id排序
function queryArticles(offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from articles order by id desc limit ?,?';
    const params = [offset, limit]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//博客所有查询根据views排序
function queryArticlesByViews(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select id,title from articles order by views desc limit 0,8';
    connectiondb.connect();
    connectiondb.query(querrySql, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//根据id查询博客
function queryArticleById(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from articles where id = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//根据id查询博客的内容,以便更改
function queryArticleContentById(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select content from articles where id = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//博客按照标题进行模糊搜索可分页
function queryArticlesByTitle(title, offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from articles where title LIKE ? order by views desc limit ?,?';
    const params = [`%${title}%`, offset, limit]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//博客按照标题进行模糊搜索只返回id和标题
function searchTitles(title, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select id,title from articles where title LIKE ? order by views desc';
    connectiondb.connect();
    connectiondb.query(querrySql, `%${title}%`, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//计算模糊搜索条数
function countArticlesByTitle(title, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countTitle from articles where title LIKE ?';
    connectiondb.connect();
    connectiondb.query(querrySql, `%${title}%`, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//根据id更改文章的views
function updateViewsAndComments(views, comments_num, id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update articles set views = ?,comments_num = ? where id = ?';
    const params = [views, comments_num, id]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })
}

//编辑博客内容
function editArticleContent(id, content, utime, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update articles set content = ?,utime = ? where id = ?';
    const params = [content, utime, id]
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })
}

//根据tagId查找关系表中的博客id
function queryArticleIdByTagId(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select article_id from tag_article_mapping where tag_id = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })
}

//计算博客总数
function countArticles(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as coutArt from articles;';
    connectiondb.connect();
    connectiondb.query(querrySql, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//通过id循环查询多篇博客
function queryArticlesById(idArr, offset, limit, success, err) {
    let querrySql = 'select * from articles where id = ?';
    for (let id = 0; id < idArr.length - 1; id++) {
        querrySql += ' or id = ?'
    }
    querrySql += ' order by views desc';
    querrySql += ' limit ?,?';
    const params = [...idArr, offset, limit]
    const connectiondb = dbutil();
    connectiondb.connect();
    connectiondb.query(querrySql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//根据id删除文章
function deleteArticle(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from articles where id = ?;';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//删除文章之后删除关系表
function deleteTAMapping(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from tag_article_mapping where article_id = ?;';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//根据文章id计算评论条数
function countCommentsById(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countComments from comments where blog_id = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, id, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

module.exports = {
    insertArticle,
    insertBlogAndTags,
    queryArticles,
    countArticles,
    queryArticlesByTitle,
    countArticlesByTitle,
    queryArticleById,
    updateViewsAndComments,
    queryArticlesByViews,
    queryArticleContentById,
    editArticleContent,
    queryArticleIdByTagId,
    queryArticlesById,
    searchTitles,
    deleteArticle,
    deleteTAMapping,
    countCommentsById
}