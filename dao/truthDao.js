const dbutil = require('./dbutil');

//将每日一句写入数据库
function insertTruth(ctime, content, isTop, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into truth (`ctime`,`content`,`is_top`) values (?,?,?)';
    connectiondb.connect();
    connectiondb.query(querrySql, [ctime, content, isTop], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//查询每日一句的时间
// function queryTruth(success, err) {
//     const connectiondb = dbutil();
//     const querrySql = 'select ctime from truth order by id desc';
//     connectiondb.connect();
//     connectiondb.query(querrySql, function(error, result) {
//         if (error == null) {
//             success(result);
//         } else {
//             err(error)
//         }
//     })

//     connectiondb.end();
// }

//查询每日一句的全部信息带分页
function queryAllTruthByPage(offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from truth order by is_top desc limit ?,?';
    const params = [offset, limit];
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

//查询每日一句的置顶
function queryTopTruth(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from truth where is_top = 1';
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

//更新每日一句置顶
function updateTop(isTop, id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update truth set is_top = ? where id = ?;';
    connectiondb.connect();
    connectiondb.query(querrySql, [isTop, id], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//计算每日一句总条数
function countTruth(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as count_truth from truth';
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
//删除每日一句
function deleteTruth(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from truth where id = ?';
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
    insertTruth,
    queryTopTruth,
    queryAllTruthByPage,
    countTruth,
    deleteTruth,
    updateTop
}