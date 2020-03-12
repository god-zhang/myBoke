<template>
    <div class="users card cardCommon">
        <div class="title cardTitle">最近访客</div>
        <hr color='#999' size='1px' class="cardHr">
        <div class="content">
            <div v-for="item in list" :key="item.name+'users'" class="imgList" :title="item.name">
                <img :src="item.avatar" alt="">
                <div class="name">{{item.name}}</div>
            </div>
        </div>
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
    mounted() {
        this.getRecentUsers();
    },
    methods: {
        getRecentUsers(){
            axios.get(`${this.global.apiUrl}recentUsers`)
            .then(res=>{
                if(res.data.code == 200){
                    this.list = res.data.result;
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .users{
        .content{
            display: flex;
            flex-wrap: wrap;
            div.imgList{
                position: relative;
                width: 59px;
                height: 55px;
                justify-content: space-between;
                margin-right: 2px;
                margin-left: 2px;
                margin-bottom: 5px;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
                .name{
                    position: absolute;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    padding: 3px 0;
                    text-align: center;
                    left: 0;
                    bottom: 0;
                    font-size: 10px;
                    background-color: rgba(0,0,0,0.5);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
</style>