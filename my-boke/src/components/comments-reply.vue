<template>
    <div class="reply">
        <div class="headImg">
            <div class="img">
                <img :src="replyData.avatar" alt="">
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span class="name1">{{replyData.name}} <span class="isAdmin" v-if="replyData.is_admin == 1">{{nickName1}}</span></span>
                <span class="reply1">回复</span>
                <span class="name2">{{replyData.parent_name}} <span class="isAdmin" v-if="replyData.is_admin == 1">{{nickName2}}</span></span>
                <span class="comment-con">
                    <template v-for="(item,index) in JSON.parse(replyData.content2)">
                        <img :src="item.split(replyData.url_split_str)[1]" alt="" :key="index+'emjiosImg'" v-if="item.indexOf(replyData.url_split_str)>-1" width='20'>
                        <span v-if="item.indexOf(replyData.url_split_str) <= -1" :key="index+'emjioSpan'">{{item}}</span>
                    </template>
                </span>
            </div>
            <div class="time">
                <span>{{replyData.ctime}}</span>
                <span @click="replyUser">{{upAndDown}}</span>
            </div>
            <replyFrame :showReply='isReplay' :parentId='parentId' :blogId='blogId' :replyName='replyData.name' :replyEmail='replyData.email'></replyFrame>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import replyFrame from '../components/replyFrame';
export default {
    components:{
        replyFrame
    },
    data() {
        return {
            upAndDown: '回复',
            isReplay: false,
        }
    },
    props: ['replyData','parentId','blogId'],
    computed: {
        nickName1(){
            if(this.replyData.name == '殒殇'){
                return '博主';
            }else{
                return '博主夫人';
            }
        },
        nickName2(){
            if(this.replyData.parent_name == '殒殇'){
                return '博主';
            }else{
                return '博主夫人';
            }
        }
    },
    methods:{
        replyUser(){
            this.isReplay = !this.isReplay;
            if(this.isReplay){
                this.upAndDown = '收起';
            }else{
                this.upAndDown = '回复';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .reply{
        display: flex;
        border-top: 1px solid #999;
        padding: 10px 0;
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
            text-align: left;
            margin-left: 10px;
            width: 100%;
            .name{
                font-size: 15px;
                font-weight: 400;
                margin-bottom: 10px;
                .isAdmin{
                    padding: 2px;
                    color: #fff;
                    font-size: 10px;
                    background-color: #6cc40d;
                    border-radius: 5px;
                    margin-left: 1px;
                }
                span{
                    margin-right: 5px;
                    &.name1,&.name2{
                        color: #2ea7e0;
                    }
                    &.reply1{
                        font-size: 15px;
                    }
                    &.comment-con{
                        font-size: 14px;
                    }
                }
            }
            .time{
                font-size: 13px;
                color: rgb(49, 49, 49);
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