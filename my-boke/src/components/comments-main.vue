<template>
    <div class="comments-main">
        <div class="headImg">
            <div class="img">
                <img :src="commentsData.avatar" alt="">
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span>{{commentsData.name}} <span class="isAdmin" v-if="commentsData.is_admin == 1">{{nickName}}</span></span>
            </div>
            <div class="comment-con">
                <template v-for="(item,index) in JSON.parse(commentsData.content2)">
                    <img :src="item.split(commentsData.url_split_str)[1]" alt="" :key="index+'emjiosImg'" v-if="item.indexOf(commentsData.url_split_str)>-1" width='25'>
                    <span v-if="item.indexOf(commentsData.url_split_str) <= -1" :key="index+'emjioSpan'">{{item}}</span>
                </template>
            </div>
            <div class="time">
                <span>{{commentsData.ctime}}</span>
                <span @click="replyUser">{{upAndDown}}</span>
            </div>
            <template v-for="item in childComments">
                <commentsReply :blogId='blogId' v-if="commentsData.id == item.parent_id" :replyData='item' :key="item.id+'childComments'" :parentId='commentsData.id' class="animated fadeInUp"></commentsReply>
            </template>
            <replyFrame :showReply='showReply' :parentId='commentsData.id' :blogId='blogId' :replyName='commentsData.name' :replyEmail='commentsData.email'></replyFrame>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import commentsReply from '../components/comments-reply';
import replyFrame from '../components/replyFrame';
import animate from 'animate.css';
export default {
    data() {
        return {
            upAndDown: '回复',
            showReply: false,
        }
    },
    components:{
        commentsReply,
        replyFrame
    },
    props: {
        isReply:{
            type: Boolean,
            default: false
        },
        commentsData:{
            type: Object,
            default: {}
        },
        childComments:{
            type: Array,
            default: []
        },
        blogId:{
            type: String,
            default: ''
        }
    },
    computed: {
        nickName(){
            if(this.commentsData.name == '殒殇'){
                return '博主';
            }else{
                return '博主夫人';
            }
        }
    },
    methods:{
        replyUser(){
            this.showReply = !this.showReply;
            if(this.showReply){
                this.upAndDown = '收起';
            }else{
                this.upAndDown = '回复';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .comments-main{
        display: flex;
        border-bottom: 1px dashed rgb(247, 234, 234);
        padding: 10px 0;
        &:last-child{
            border-bottom: none;
        }
        .headImg{
            padding-top: 5px;
            .img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    vertical-align: middle;
                    width: 100%;
                }
            }
        }
        .content{
            width: 100%;
            text-align: left;
            margin-left: 10px;
            .name{
                color: #2ea7e0;
                font-size: 15px;
                font-weight: 400;
                .isAdmin{
                    padding: 2px;
                    color: #fff;
                    font-size: 10px;
                    background-color: #6cc40d;
                    border-radius: 5px;
                    margin-left: 1px;
                }
            }
            .comment-con{
                margin-bottom: 10px;
                margin-top: 15px;
                font-size: 14px;
                box-sizing: border-box;
                width: 90%;
                word-break: break-all;
            }
            .time{
                font-size: 13px;
                color: rgb(49, 49, 49);
                padding-bottom: 10px;
                span{
                    &:last-child{
                        margin-left: 10px;
                        color: #2ea7e0;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>