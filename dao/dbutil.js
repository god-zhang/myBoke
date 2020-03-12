//此文件是公共数据库的部分

//下载安装引入mysql
const mysql = require('mysql');

function sqlConnect() {
    //创建一个mysql的链接,参数是一个配置对象
    const mysqlConnect = mysql.createConnection({
        //地址
        host: '127.0.0.1',
        //端口
        port: 3306,
        //用户名
        user: 'root',
        //密码
        password: 'zm2374171406',
        //需要链接的数据库
        database: 'blog'
    })

    return mysqlConnect;
}

module.exports = sqlConnect;