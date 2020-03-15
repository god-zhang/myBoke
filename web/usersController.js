const apiMap = new Map();
const globalConfig = require('../config');
const wlog = require('../log');
const url = require('url');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const common = require('../utils/common');

const captcha = require('svg-captcha');

const nodemailer = require('nodemailer');

const usersDao = require('../dao/usersDao');

const pageViewsDao = require('../dao/pageViewsDao');

//随机验证码
let code = '';


//注册
function register(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const name = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const hashPass = bcrypt.hashSync(password, salt);
    usersDao.queryUserByNameOrEmail(name, email, (userInfo) => {
        if (userInfo.length > 0) {
            const resultMes = userInfo[0].name == name ? `用户名 ${name} 已被注册,请重新输入` : `邮箱 ${email} 已被注册,请重新输入或直接登录`;
            fs.unlink(`./files/${req.file.filename}`, () => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 201, msg: resultMes }));
                res.end();
            })
            return;
        } else {
            if (req.body.code == code) {
                setAvatarUrl(req, (avatarUrl) => {
                    usersDao.register(name, hashPass, avatarUrl, email, 0, common.getDate(), 0, (result) => {
                        res.writeHead(200, globalConfig['access_header']);
                        res.write(JSON.stringify({ code: 200, msg: `${name}: 注册成功` }))
                        res.end();
                    }, err => {
                        res.writeHead(500, globalConfig['access_header']);
                        res.write(JSON.stringify(`注册失败`))
                        res.end();
                        wlog.errLog('注册失败' + err);
                    })
                })
            } else {
                fs.unlink(`./files/${req.file.filename}`, () => {
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify({ code: 202, msg: '验证码输入有误' }))
                    res.end();
                })
                return;
            }

        }

    }, userErr => {
        wlog.errLog('用户查询失败' + userErr);
    })
}


//登录
function login(req, res) {
    req.on('data', (data) => {
        const email = JSON.parse(data.toString()).email;
        const password = JSON.parse(data.toString()).password;
        usersDao.login(email, (result) => {
            if (result.length > 0) {
                let pass = result[0].password;
                if (bcrypt.compareSync(password, pass)) {
                    const userRes = {
                        id: result[0].id,
                        name: result[0].name,
                        avatar: result[0].avatar,
                        is_admin: result[0].is_admin
                    }
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify({ code: 200, msg: `登录成功,欢迎 ${result[0].name}`, result: userRes }))
                    res.end();
                    usersDao.updateLoginTime(common.getIntDate(), email, (updateRes) => {}, (updateErr) => {
                        wlog.errLog('用户登录时间更新失败' + updateErr);
                    })
                    pageViewsDao.queryViews((viewsRes) => {
                        if (viewsRes.length > 0) {
                            pageViewsDao.updateViews(parseInt(viewsRes[0].id), parseInt(viewsRes[0].views) + 1, common.getDate(), (updateRes) => {}, updateErr => {
                                wlog.errLog('更新浏览量失败' + updateErr);
                            })
                        }
                    }, viewsErr => {
                        wlog.errLog('查询浏览量最后一条失败' + viewsErr);
                    })
                } else {
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify({ code: 201, msg: '密码错误' }))
                    res.end();
                }
            } else {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 202, msg: '此邮箱未被注册' }))
                res.end();
            }
        }, err => {
            wlog.errLog('用户查询失败' + err);
        })
    })
}

//设置用户头像的url
function setAvatarUrl(req, success) {
    const extName = req.file.originalname.split('.')[1];
    const newName = req.file.filename + '.' + extName;
    fs.rename(req.file.destination + req.file.filename, req.file.destination + 'avatars/' + newName, (err) => {
        if (err) {
            wlog.errLog('文件重命名失败' + err);
        } else {
            let domain = `http://${req.headers.host}/`;
            const coverUrl = domain + 'avatars/' + newName;
            success(coverUrl);
        }
    })
}

//用户评论
function insertComments(req, res) {
    let commentsData = '';
    req.on('data', (data) => {
        commentsData += data;
    })

    req.on('end', () => {
        const params = JSON.parse(commentsData.toString());
        const { name, avatar, content1, content2, blog_id, parent_id, email, parent_email, parent_name, is_admin, url_split_str } = params;
        usersDao.insertComments(name, avatar, content1, content2, common.getDate(), parseInt(blog_id), parseInt(parent_id), email, parent_email, parent_name, parseInt(is_admin), url_split_str, (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify({ code: 200, msg: '评论成功,感谢您的评论' }))
            res.end();
            sendEmail(parent_email, `<h3><span style='color: #05b0ff'>${name}</span>在 <a href='${req.headers['referer']}'>殒殇的博客里</a> 回复了你: ${content1}<h3>`, (mailerr, maildata) => {
                if (mailerr) {
                    wlog.errLog('邮件发送失败' + mailerr);
                }
            })
        }, err => {
            wlog.errLog('评论语句出错' + err);
        })
    })
}

//展示用户评论以及后台管理展示留言
function showUsersComments(req, res) {
    const params = url.parse(req.url, true).query;
    if (params.search) {
        usersDao.queryMesByContent(params.search, parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countMesByContent(params.search, (countMes) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countMes[0].countContent }))
                res.end();
            }, errMes => {
                wlog.errLog('计算留言出错' + errMes);
            })
        }, err => {
            wlog.errLog('查询留言出错' + err);
        })
    } else {
        usersDao.queryAllCommentsByBlogId(parseInt(params.blog_id), parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countCommentsById(parseInt(params.blog_id), (countBlog) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countBlog[0].countComments }))
                res.end();
            }, countErr => {
                wlog.errLog('计算评论出错' + countErr);
            })
        }, err => {
            wlog.errLog('查询评论出错' + err);
        })
    }
}

//后台管理展示评论
function showCommentsToAdmin(req, res) {
    const params = url.parse(req.url, true).query;
    if (params.search) {
        usersDao.queryCommentsByContent(params.search, parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countCommentsByContent(params.search, (countMes) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countMes[0].countContent }))
                res.end();
            }, errMes => {
                wlog.errLog('计算评论条数出错' + errMes);
            })
        }, err => {
            wlog.errLog('查询评论出错' + err);
        })
    } else {
        usersDao.queryCommentsNotBlogId(parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countCommentsNotBlogId((countBlog) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countBlog[0].countNotBlogId }))
                res.end();
            }, countErr => {
                wlog.errLog('计算不为-1的评论出错' + countErr);
            })
        }, err => {
            wlog.errLog('查询不为-1的评论出错' + err);
        })
    }
}



//用户管理
function queryAllUsers(req, res) {
    const params = url.parse(req.url, true).query;
    if (params.search) {
        usersDao.queryUsersByName(params.search, parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countUsersByName(params.name, (countName) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countName[0].countUserName }))
                res.end();
            }, countErr => {
                wlog.errLog('模糊搜索用户计算出错' + countErr);
            })
        }, err => {
            wlog.errLog('用户搜索用户出错' + err);
        })
    } else {
        usersDao.queryAllUsers(parseInt(params.offset), parseInt(params.limit), (result) => {
            usersDao.countAllUsers((countUsers) => {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 200, msg: 'success', rows: result, total: countUsers[0].countUsers }))
                res.end();
            }, countUserErr => {
                wlog.errLog('用户计算出错' + countUserErr);
            })
        }, err => {
            wlog.errLog('用户查询出错' + err);
        })
    }
}


//删除用户 
function deleteUser(req, res) {
    req.on('data', (data) => {
        const id = parseInt(data.toString().split('=')[1]);
        usersDao.queryUserById(parseInt(id), (userAvatar) => {
            if (userAvatar.length > 0) {
                const imgName = userAvatar[0].avatar.split('/avatars/')[1];
                usersDao.deleteUser(parseInt(id), (deleteRes) => {
                    fs.unlink(`./files/avatars/${imgName}`, () => {
                        res.writeHead(200, globalConfig['access_header']);
                        res.write(JSON.stringify(`删除用户 ${id} 成功`))
                        res.end();
                    })
                }, deleteErr => {
                    wlog.errLog('用户删除出错' + deleteErr);
                })
            }
        }, userErr => {
            wlog.errLog('用户查询出错' + userErr);
        })

    })
}

//删除评论
function deleteComment(req, res) {
    req.on('data', (data) => {
        const id = parseInt(data.toString().split('=')[1]);
        usersDao.deleteComment(parseInt(id), (result) => {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify(`删除评论 ${id} 成功`))
            res.end();
        }, err => {
            wlog.errLog('删除评论出错' + err);
        })
    })
}


//设置管理员
function setAdmin(req, res) {
    const params = url.parse(req.url, true).query;
    usersDao.setAdmin(parseInt(params.id), (result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify(`设置 ${params.id} 为管理员成功`))
        res.end();
    }, err => {
        wlog.errLog('更新is_admin出错' + err);
    })
}


//管理员登录
function adminLogin(req, res) {
    req.on('data', data => {
        const email = JSON.parse(data.toString()).email;
        const pwd = JSON.parse(data.toString()).password;
        usersDao.adminLogin(email, (result) => {
            if (result.length > 0) {
                let pass = result[0].password;
                if (bcrypt.compareSync(pwd, pass)) {
                    const userRes = {
                        id: result[0].id,
                        email: result[0].email,
                        name: result[0].name,
                        avatar: result[0].avatar,
                    }
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify({ code: 200, msg: `登录成功,欢迎${result[0].name}管理员`, result: userRes }))
                    res.end();
                } else {
                    res.writeHead(200, globalConfig['access_header']);
                    res.write(JSON.stringify({ code: 201, msg: '密码错误' }))
                    res.end();
                }
            } else {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 202, msg: '您不是管理员,请勿登录' }))
                res.end();
            }
        }, (err) => {
            wlog.errLog('管理员查询失败' + err);
        })
    })
}

//展示最近访客
function recentUsers(req, res) {
    usersDao.recentUsers((result) => {
        res.writeHead(200, globalConfig['access_header']);
        res.write(JSON.stringify({ code: 200, msg: 'success', result: result }))
        res.end();
    }, err => {
        wlog.errLog('最近访客查询失败' + err);
    })
}

//生成随机验证码
function randomCode(req, res) {
    const params = url.parse(req.url, true).query;
    code = captcha.create({ fontSize: 50, width: 100 }).text;
    usersDao.queryUserByNameOrEmail('', params.email, (userInfo) => {
        if (userInfo.length == 0) {
            if (code) {
                sendEmail(params.email, `<h3>欢迎 小哥哥,小姐姐的加入哟~</h3>
                            <h4>客官记得常来呀<span style='color: #fe4a4a'>❤</span>~</h4>
                            <h4>您的验证码是: <span style='color: #6200ec;font-size: 18px;'>${code}</span></h4>
                            <img src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1557987058,3313689738&fm=26&gp=0.jpg' />`, (mailerr, data) => {
                    if (mailerr) {
                        res.writeHead(200, globalConfig['access_header']);
                        res.write(JSON.stringify({ code: 201, msg: '验证码发送失败,请检查邮箱是否为QQ邮箱' }))
                        res.end();
                        wlog.errLog('邮件发送失败' + mailerr);
                    } else {
                        res.writeHead(200, globalConfig['access_header']);
                        res.write(JSON.stringify({ code: 200, msg: '验证码发送成功' }))
                        res.end();
                    }
                })
            } else {
                res.writeHead(200, globalConfig['access_header']);
                res.write(JSON.stringify({ code: 202, msg: '验证码生成失败' }))
                res.end();
                wlog.errLog('随机验证码生成失败');
            }
        } else {
            res.writeHead(200, globalConfig['access_header']);
            res.write(JSON.stringify({ code: 203, msg: '该邮箱已被注册,可直接登录' }))
            res.end();
        }
    }, err => {
        wlog.errLog('发送验证码时查询用户失败' + err);
    })

}

//发送邮件
function sendEmail(user, html, success) {
    const email = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lmmkazhangmin@foxmail.com',
            pass: 'zrayswncfynoebhf'
        }
    })

    const msg = {
        from: '殒殇 <lmmkazhangmin@foxmail.com>',
        to: user,
        subject: '您收到一封匿名表白信,请查收~',
        html: html
    }

    email.sendMail(msg, (err, data) => {
        success(err, data);
    })
}

apiMap.set('/api/register', register);
apiMap.set('/api/randomCode', randomCode);
apiMap.set('/api/login', login);
apiMap.set('/api/insertComments', insertComments);
apiMap.set('/api/showUsersComments', showUsersComments);
apiMap.set('/api/queryAllUsers', queryAllUsers);
apiMap.set('/api/deleteUser', deleteUser);
apiMap.set('/api/deleteComment', deleteComment);
apiMap.set('/api/showCommentsToAdmin', showCommentsToAdmin);
apiMap.set('/api/setAdmin', setAdmin);
apiMap.set('/api/adminLogin', adminLogin);
apiMap.set('/api/recentUsers', recentUsers);

module.exports.apiMap = apiMap;