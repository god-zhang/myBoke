const dbutil = require('./dbutil');

//tag插入
function insertTag(name, ctime, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into tags (`name`,`ctime`) values (?,?)';
    connectiondb.connect();
    connectiondb.query(querrySql, [name, ctime], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//tag查询
function queryTags(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from tags';
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

//tag删除
function deleteTag(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from tags where id = ?';
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

//根据tag_id查关系表中有多少篇文章
function countByTagId(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countTag from tag_article_mapping where tag_id = ?';
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
    insertTag,
    queryTags,
    deleteTag,
    countByTagId
}