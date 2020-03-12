const dbutil = require('./dbutil');

//表情插入
function insertEmojis(alt, src, show, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into emojis (`alt`,`src`,`show`) values (?,?,?);';
    connectiondb.connect();
    connectiondb.query(querrySql, [alt, src, show], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//表情查询
function queryEmoji(alt, success, err) {
    const connectiondb = dbutil();
    let querrySql = '';
    if (alt) {
        querrySql = 'select * from emojis where alt = ?;';
    } else {
        querrySql = 'select * from emojis;';
    }
    connectiondb.connect();
    connectiondb.query(querrySql, alt ? alt : '', function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}


//表情删除
function deleteEmoji(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from emojis where id = ?;';
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
    insertEmojis,
    deleteEmoji,
    queryEmoji
}