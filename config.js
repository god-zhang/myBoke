module.exports = {
    port: 11306,
    static_path: '/page',
    static_img_path: '/files',
    static_admin_path: '/admin',
    web_path: '/web',
    log_path: '/log',
    error_log_name: '/error.log',
    db_log_name: '/db.log',
    access_header: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With",
        "Content-Type": "application/json; charset=utf-8"
    }
}