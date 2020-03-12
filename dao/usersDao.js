const dbutil = require('./dbutil');

//注册
function register(name, password, avatar, email, is_admin, ctime, login_time, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into users (`name`,`password`,`avatar`,`email`, `is_admin`,`ctime`,`login_time`) values (?,?,?,?,?,?,?)';
    connectiondb.connect();
    connectiondb.query(querrySql, [name, password, avatar, email, is_admin, ctime, login_time], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}


//登录
function login(email, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from users where email = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, email, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//查相同
function queryUserByNameOrEmail(name, email, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select name,email from users where name = ? or email = ?';
    connectiondb.connect();
    connectiondb.query(querrySql, [name, email], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//用户写评论
function insertComments(name, avatar, content1, content2, ctime, blog_id, parent_id, email, parent_email, parent_name, is_admin, url_split_str, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'insert into comments (`name`,`avatar`,`content1`,`content2`, `ctime`,`blog_id`,`parent_id`,`email`,`parent_email`,`parent_name`,`is_admin`,`url_split_str`) values (?,?,?,?,?,?,?,?,?,?,?,?)';
    const params = [name, avatar, content1, content2, ctime, blog_id, parent_id, email, parent_email, parent_name, is_admin, url_split_str]
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

//读评论
function queryAllCommentsByBlogId(id, offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from comments where blog_id = ? order by id desc limit ?,?';
    connectiondb.connect();
    connectiondb.query(querrySql, [id, offset, limit], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//用户管理
function queryAllUsers(offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from users order by login_time desc limit ?,?';
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

//通过id查用户
function queryUserById(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select avatar from users where id = ?';
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

//计算用户总数
function countAllUsers(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countUsers from users;';
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

//删除用户
function deleteUser(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from users where id = ?;';
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

//模糊搜索用户
function queryUsersByName(name, offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from users where name LIKE ? order by id desc limit ?,?';
    const params = [`%${name}%`, offset, limit]
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

//计算模糊搜索条数
function countUsersByName(name, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countUserName from users where name LIKE ?';
    connectiondb.connect();
    connectiondb.query(querrySql, `%${name}%`, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//模糊搜索评论
function queryCommentsByContent(content1, offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from comments where content1 LIKE ? and not blog_id = -1 order by id desc limit ?,?';
    const params = [`%${content1}%`, offset, limit]
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

//模糊搜索留言
function queryMesByContent(content1, offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from comments where content1 LIKE ? order by id desc limit ?,?';
    const params = [`%${content1}%`, offset, limit]
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

//计算留言的模糊搜索条数
function countMesByContent(content1, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countContent from comments where content1 LIKE ?';
    connectiondb.connect();
    connectiondb.query(querrySql, `%${content1}%`, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//计算评论的模糊搜索条数
function countCommentsByContent(content1, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countContent from comments where content1 LIKE ? and not blog_id = -1';
    connectiondb.connect();
    connectiondb.query(querrySql, `%${content1}%`, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//删除评论
function deleteComment(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'delete from comments where id = ?;';
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

//计算评论总数
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

//从评论表中选出blog_id不为-1的评论
function queryCommentsNotBlogId(offset, limit, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from comments where not blog_id = -1 order by id desc limit ?,?';
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

//计算评论表中blog_id不为-1的评论条数
function countCommentsNotBlogId(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select count(1) as countNotBlogId from comments where not blog_id = -1';
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

//设置管理员
function setAdmin(id, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update users set is_admin = 1 where id = ?';
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

//管理员登录
function adminLogin(email, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select * from users where is_admin = 1 and email = ?;';
    connectiondb.connect();
    connectiondb.query(querrySql, email, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//更新用户登录时间
function updateLoginTime(time, email, success, err) {
    const connectiondb = dbutil();
    const querrySql = 'update users set login_time = ? where email = ?;';
    connectiondb.connect();
    connectiondb.query(querrySql, [time, email], function(error, result) {
        if (error == null) {
            success(result);
        } else {
            err(error)
        }
    })

    connectiondb.end();
}

//最近访客
function recentUsers(success, err) {
    const connectiondb = dbutil();
    const querrySql = 'select name,avatar from users where login_time > 0 order by login_time desc limit 0,11;';
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
    register,
    login,
    queryUserByNameOrEmail,
    insertComments,
    queryAllCommentsByBlogId,
    queryAllUsers,
    countAllUsers,
    deleteUser,
    queryUserById,
    queryUsersByName,
    countUsersByName,
    deleteComment,
    countCommentsById,
    queryCommentsNotBlogId,
    queryCommentsByContent,
    countCommentsByContent,
    countCommentsNotBlogId,
    queryMesByContent,
    countMesByContent,
    setAdmin,
    adminLogin,
    updateLoginTime,
    recentUsers
}