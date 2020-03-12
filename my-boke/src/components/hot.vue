<template>
    <div class="hot card cardCommon">
        <div class="title cardTitle">热门文章</div>
        <hr color='#999' size='1px' class="cardHr">
        <ul>
            <router-link tag="li" v-for="(item,index) in list" :key="item.id+'hot'" :to="'/article?aId='+item.id">
                <span>{{index+1}}</span><span>{{item.title}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            list:[]
        }
    },

    created() {
        axios.get(`${this.global.apiUrl}queryArticlesByViews`)
        .then(res => {
            if(res.status == 200){
                this.list = res.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
    },
}
</script>

<style lang="less" scoped>
    .hot{
        ul{
            li{
                height: 35px;
                line-height: 35px;
                position: relative;
                cursor: pointer;
                &:nth-of-type(1){
                    span{
                        &:first-child{
                            background-color: #e24d46;
                        }
                    }
                }
                &:nth-of-type(2){
                    span{
                        &:first-child{
                            background-color: #2ea7e0;
                        }
                    }
                }
                &:nth-of-type(3){
                    span{
                        &:first-child{
                            background-color: #6bc30d;
                        }
                    }
                }
                span{
                    &:first-child{
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        line-height: 22px;
                        border-radius: 50%;
                        background-color: #999999;
                        text-align: center;
                    }
                    &:last-child{
                        padding-left: 10px;
                    }
                }
                &:hover{
                    span:last-child{
                        color: rgba(255, 255, 255, .6);
                    }
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 1px;
                        background-color: #555;
                        animation: hoverAni 1s ease-in-out forwards;
                    }
                }
            }
        }
    }

    @keyframes hoverAni {
        0%{
            width: 0;
        }
        100%{
            width: 100%;
        }
    }
</style>