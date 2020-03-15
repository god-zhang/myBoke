const dbutil = require('./dbutil');

//插入一条浏览记录
function insertViews(views, ctime, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into page_views (`views`,`ctime`) values (?,?)';
    connectiondb.connect();
    connectiondb.query(querrySql, [views, ctime], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//查询浏览记录最后一条
function queryViews(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from page_views order by id desc limit 1';
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

//查询所有浏览记录
function queryViewsTop7(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from page_views order by id desc limit 7';
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

//更新指定的浏览记录
function updateViews(id, views, ctime, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update page_views set views = ?,ctime = ? where id = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, [views, ctime, id], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

module.exports = {
    insertViews,
    queryViews,
    queryViewsTop7,
    updateViews
}