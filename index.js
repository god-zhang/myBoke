const express = require('express');
const history = require('connect-history-api-fallback');
const url = require('url');
const multer = require('multer');
const schedule = require('node-schedule');

const app = new express();
const globalConfig = require('./config');
const loader = require('./loader');


const fileUpload = multer({ dest: './files/' })


app.use(history());


app.use(express.static(__dirname + globalConfig['static_path']));
app.use(express.static(__dirname + globalConfig['static_img_path']));
app.use(express.static(__dirname + globalConfig['static_admin_path']));

// 拦截器
// app.get('/*', (req, res, next) => {
//     if(req.cookies.userInfo){

//     }
// })

//用户相关
app.post('/api/register', fileUpload.single('avatar'), loader.get('/api/register'));
app.post('/api/login', loader.get('/api/login'));
app.post('/api/insertComments', loader.get('/api/insertComments'));
app.get('/api/randomCode', loader.get('/api/randomCode'));
app.get('/api/showUsersComments', loader.get('/api/showUsersComments'));
app.get('/api/queryAllUsers', loader.get('/api/queryAllUsers'));
app.post('/api/deleteUser', loader.get('/api/deleteUser'));
app.post('/api/deleteComment', loader.get('/api/deleteComment'));
app.get('/api/showCommentsToAdmin', loader.get('/api/showCommentsToAdmin'));
app.get('/api/setAdmin', loader.get('/api/setAdmin'));
app.post('/api/adminLogin', loader.get('/api/adminLogin'));
app.get('/api/recentUsers', loader.get('/api/recentUsers'));

//每日一句
app.get('/api/queryTopTruth', loader.get('/api/queryTopTruth'));
app.get('/api/allTruthByPage', loader.get('/api/allTruthByPage'));
app.post('/api/deleteTruth', loader.get('/api/deleteTruth'));
app.get('/api/updateTop', loader.get('/api/updateTop'));

//博客相关
app.post('/api/insertArticle', fileUpload.single('cover'), loader.get('/api/insertArticle'));
app.get('/api/queryArticles', loader.get('/api/queryArticles'));
app.get('/api/queryArticleById', loader.get('/api/queryArticleById'));
app.get('/api/queryArticlesByViews', loader.get('/api/queryArticlesByViews'));
app.get('/api/queryArticleContentById', loader.get('/api/queryArticleContentById'));
app.post('/api/editArticleContent', loader.get('/api/editArticleContent'));
app.get('/api/queryArticlesByTag', loader.get('/api/queryArticlesByTag'));
app.get('/api/searchTitles', loader.get('/api/searchTitles'));
app.post('/api/deleteArticle', loader.get('/api/deleteArticle'));

//标签相关
app.get('/api/insertTag', loader.get('/api/insertTag'));
app.get('/api/queryTags', loader.get('/api/queryTags'));
app.post('/api/deleteTag', loader.get('/api/deleteTag'));
app.get('/api/countByTagId', loader.get('/api/countByTagId'));


//表情相关
app.post('/api/insertEmojis', loader.get('/api/insertEmojis'));
app.get('/api/queryEmoji', loader.get('/api/queryEmoji'));
app.post('/api/deleteEmoji', loader.get('/api/deleteEmoji'));


//随笔相关
app.post('/api/insertEssay', loader.get('/api/insertEssay'));
app.get('/api/queryEssays', loader.get('/api/queryEssays'));
app.get('/api/queryEssayByPage', loader.get('/api/queryEssayByPage'));
app.post('/api/deleteEssay', loader.get('/api/deleteEssay'));

//定时任务
schedule.scheduleJob('00 30 10 * * *', () => {
    loader.get('/api/truth')();
    console.log('每日一句更新完成')
})



app.listen(globalConfig['port'], () => {
    console.log(`Server started on port`);
});