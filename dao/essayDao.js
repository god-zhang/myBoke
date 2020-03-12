const dbutil = require('./dbutil');

//随笔插入
function insertEssay(content, ctime, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into essay (`content`,`ctime`) values (?,?)';
    connectiondb.connect();
    connectiondb.query(querrySql, [content, ctime], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//随笔查询
function queryEssay(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from essay order by id desc';
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


//随笔带分页
function queryEssayByPage(offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from essay order by id desc limit ?,?';
    connectiondb.connect();
    connectiondb.query(querrySql, [offset, limit], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//随笔删除
function deleteEssay(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from essay where id = ?';
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

//计算每日一句总条数
function countEssay(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as count_essay from essay';
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

module.exports = {
    insertEssay,
    queryEssay,
    deleteEssay,
    queryEssayByPage,
    countEssay
}