<template>
    <div class="article cardCommon card animated bounceInUp">
        <div class="head">
            <div class="mes">
                <div class="title">{{articleData.title}}</div>
                <div class="other_mes">
                    <span class="auth">作者: <span>{{articleData.author}}</span></span>
                    <span class="views">吃瓜群众: <span>{{articleData.views}}</span></span>
                    <span class="refresh">更新于 <span>{{articleData.utime}}</span></span>
                </div>
            </div>
            <div class="time">{{dealDate('y')}} {{dealDate('m')}} <span>/{{dealDate('d')}}</span></div>
        </div>
        <hr color='#555' size='1px'>
        <div class="content" v-html="articleData.content"></div>
        <div class="explain">
            <p>非特殊说明, 本文版权归 <span>{{articleData.author}}</span> 所有, 转载请注明出处</p>
            <p>本文标题: {{articleData.title}}</p>
            <p>本文作者: <span>{{articleData.author}}</span></p>
            <p>本文网址: <a :href="getUrl" target="_blank">{{getUrl}}</a></p>
        </div>
        <hr color='#555' size='1px'>
        <div class="share">
            <div class="qq" title="分享到qq" @click="shareToQQ">
                <img src="~@/assets/images/qq.png" alt="qq分享">
            </div>
            <div class="wechat" title="分享到微信" @click="shareToWeChat">
                <img src="~@/assets/images/wechat.png" alt="微信分享">
            </div>
            <div class="qqSpace" title="分享到qq空间" @click="shareToQZone">
                <img src="~@/assets/images/qqSpace.png" alt="qq空间分享">
            </div>
        </div>
        <hr color='#555' size='1px'>
        <div class="comments">
            <h3>发表评论</h3>
            <giveMes :isHide='isHide' :submitBtn='submitBtn' :blogId='aId' class="noCard"></giveMes>
            <comments :blogId='aId' class="noCard"></comments>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import giveMes from '../components/givemeMes';
import comments from '../components/comments';
import axios from 'axios';
import animate from 'animate.css';
export default {
    props:[''],
    components:{
        giveMes,
        comments
    },
    data() {
        return {
            isHide: false,
            submitBtn: 'biu ~',
            scrollBottom: 50,
            aId: null,
            articleData: {},
            articleUrl: ''
        }
    },
    created() {
        this.aId = this.$router.currentRoute.query.aId;
        const loading = this.$layer.loading({content: '加载中...'})
        if(!this.aId){
            this.$layer.msg('您搜索的文章不存在');
            this.$router.push('/home');
            return;
        }
        this.changeArticleId(this.$router.currentRoute.query.aId);
        axios.get(`${this.global.apiUrl}queryArticleById?id=${this.aId}`)
        .then(res => {
            if(res.status == 200 && res.data.msg){
                this.$layer.msg('您搜索的文章不存在');
                this.$router.push('/home');
            }else if(res.status == 200 && !res.data.msg){
                this.$layer.close(loading);
                this.articleData = res.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
    },
    methods:{
        ...mapMutations(['changeArticleId']),
        shareToQQ(){
            var p = {
                url: this.getUrl,/*获取URL，可加上来自分享到QQ标识，方便统计*/
                desc: '来自 殒殇博客 的分享', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
                title : '前端技术干货分享,欢迎关注浪里小白龙 殒殇 [嘻嘻]',/*分享标题(可选)*/
                summary : this.articleData.title,/*分享描述(可选)*/
                pics : this.articleData.cover,/*分享图片(可选)*/
                commonClient : true, /*客户端嵌入标志*/
                site: '殒殇博客',/*分享来源 (可选) ，如：QQ分享*/
            };


            var s = [];
            for (var i in p) {
                s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            var target_url = "http://connect.qq.com/widget/shareqq/iframe_index.html?" + s.join('&') ;
            window.open(target_url, 'qq');
        },
        shareToQZone(){
            var p = {
                url: this.getUrl,
                showcount: '1',
                desc: '来自 殒殇博客 的分享',
                title : '前端技术干货分享,欢迎关注浪里小白龙 殒殇 [嘻嘻]',
                summary : this.articleData.title,
                pics : this.articleData.cover,
                site: '殒殇博客'
            };
            var s = [];
            for (var i in p) {
                s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            var target_url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+s.join('&');
            window.open(target_url, 'qZone');
        },
        shareToWeChat(){
            var target_url = "http://qr.liantu.com/api.php?text=http://test.qicheyitiao.com";
            window.open(target_url, 'weixin');
        }
    },
    computed: {
        dealDate(){
            return function(type){
                if(this.articleData.ctime){
                    if(type == 'y'){
                        return this.articleData.ctime.split('-')[0];
                    }else if(type == 'm'){
                        return this.articleData.ctime.split('-')[1];
                    }else{
                        return this.articleData.ctime.split(' ')[0].split('-')[2];
                    }
                }
            }
        },
        getUrl(){
            return window.location.href;
        }
    },
}
</script>

<style lang="less" scoped>
    .article{
        width: 66.7%;
        margin: 10px auto;
        .head{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .mes{
                .title{
                    font-size: 22px;
                    color: #000;
                    margin-bottom: 5px;
                }
                .other_mes{
                    margin-bottom: 10px;
                    font-size: 14px;
                    span.auth,span.views,span.refresh{
                        margin-right: 15px;
                        span{
                            color: #00c800;
                            font-weight: 400;
                        }
                    }
                }
            }
            .time{
                font-size: 15px;
                span{
                    color: #00c800;
                    font-size: 40px;
                }
            }
        }
        .content{
            margin: 20px 0;
        }
        .explain{
            margin: 10px 0;
            padding: 10px 15px;
            color: #787977;
            font-size: 12px;
            text-shadow: 0 1px 0 rgba(255,255,255,.8);
            background-color: #f8f9f7;
            line-height: 20px;
            border-radius: 5px;
            span{
                color: #00c800;
            }
        }
        .share{
            padding: 15px 0;
            display: flex;
            justify-content: center;
            div{
                border: 2px solid #787977;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                line-height: 32px;
                text-align: center;
                box-sizing: border-box;
                margin: 0 10px;
                cursor: pointer;
                &.qq{
                    border-color: #1296db;
                }
                &.wechat{
                    border-color: #5ac64f;
                }
                &.qqSpace{
                    border-color: #fec449;
                }
                img{
                    width: 25px;
                    vertical-align: middle;
                }
            }
        }
        .comments{
            h3{
                margin: 10px 0;
            }
            .noCard{
                background-color: transparent;
            }
        }
    }

    @media screen and (max-width:1024px){
        .article{
            width: 90%;
            .head{
                .mes{
                    .other_mes{
                        .refresh{
                            word-break: break-all;
                            display: block;
                            line-height: 35px;
                        }
                    }
                }
            }
        }
    }
</style>