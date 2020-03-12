<template>
  <div class="blogCard card animated zoomInUp">
    <div class="head">
        <router-link class="title" tag="div" :to="'/article?aId='+articles.id">
            <span>【{{articles.type}}】</span>
            <span class="titleCon">{{articles.title}}</span>
        </router-link>
        <div class="time">
            <span :style="{color: randomColor1}">{{dealDate('y')}}</span>&nbsp;-&nbsp;<span :style="{color: randomColor2}">{{dealDate('m')}}</span>&nbsp;-&nbsp;<span :style="{color: randomColor3}">{{dealDate('d')}}</span>
        </div>
    </div>
    <div class="body">
        <div class="img">
            <img :src="articles.cover" alt="">
        </div>
        <div class="desc">{{articles.introduce}}</div>
    </div>
    <div class="hr"></div>
    <div class="foot">
        <div class="tag">
            <img src="~@/assets/images/tag.png" alt="">
            <span v-for="item in dealTags" :key="item+'TAGS'">{{item}}</span>
        </div>
        <div class="number">
            <div class="views">
                <img src="~@/assets/images/views.png" alt="">
                <span>{{articles.views}}</span>
            </div>
            <div class="comment">
                <img src="~@/assets/images/comment.png" alt="">
                <span>{{articles.comments_num}}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css';
export default {
    props: ['articles'],
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    computed:{
        randomColor1(){
            const zimu = ['a','b','c','d','e','f',1,2,3,4,5,6,7,8,9,0];
            let str = '';
            for (let i = 0; i < 6; i++) {
                const randomZ = zimu[parseInt(Math.random()*zimu.length)];
                str+=randomZ;
            }
            return '#'+str;
        },
        randomColor2(){
            const zimu = ['a','b','c','d','e','f',1,2,3,4,5,6,7,8,9,0];
            let str = '';
            for (let i = 0; i < 6; i++) {
                const randomZ = zimu[parseInt(Math.random()*zimu.length)];
                str+=randomZ;
            }
            return '#'+str;
        },
        randomColor3(){
            const zimu = ['a','b','c','d','e','f',1,2,3,4,5,6,7,8,9,0];
            let str = '';
            for (let i = 0; i < 6; i++) {
                const randomZ = zimu[parseInt(Math.random()*zimu.length)];
                str+=randomZ;
            }
            return '#'+str;
        },
        dealDate(){
            return function(type){
                if(type == 'y'){
                    return this.articles.ctime.split('-')[0];
                }else if(type == 'm'){
                    return this.articles.ctime.split('-')[1];
                }else{
                    return this.articles.ctime.split(' ')[0].split('-')[2];
                }
            }
        },
        dealTags(){
            const tagArr = this.articles.tags.split(',');
            return tagArr;
        }
    }
}
</script>

<style lang="less" scoped>
    .blogCard{
        padding: 20px;
        box-sizing: border-box;
        .head{
            font-size: 16px;
            .title{
                cursor: pointer;
                flex: 10;
                .titleCon:hover{
                    color: #05b0ff;
                    text-decoration: underline;
                }
                span{
                    &:first-child{
                        color: aqua;
                        font-weight: 400;
                    }
                    &:last-child{
                        margin-left: 10px;
                    }
                }
            }
            .time{
                flex: 2;
                text-align: right;
                font-weight: 600;
                span{
                    font-size: 18px;
                }
            }
        }
        .head,.body{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .body{
            .img{
                width: 50%;
                img{
                    width: 100%;
                }
            }
            .desc{
                margin-left: 2%;
                padding-top: 10px;
                width: 48%;
                text-align: left;
            }
        }
        .hr{
            width: 100%;
            height: 2px;
            background-color: #666;
            margin-bottom: 20px;
        }
        .foot{
            display: flex;
            justify-content: space-between;
            img{
                vertical-align: middle;
            }
            display: flex;
            justify-content: space-between;
            align-items: center;
            .number{
                display: flex;
                justify-content: right;
                font-size: 14px;
                color: #ace;
                .views{
                    margin-right: 15px;
                }
                img{
                    margin-right: 5px;
                }
            }

            .tag{
                img{
                    margin-right: 10px;
                    vertical-align: middle;
                }
                span{
                    display: inline-block;
                    padding: 4px;
                    text-align: center;
                    background-color: #666;
                    margin-right: 10px;
                    font-size: 12px;
                    border-radius: 5px;
                }
            }
        }
        
    }

    @media screen and (max-width: 767px){
        .blogCard{
            .head{
                .title{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    .titleCon:hover{
                        color: #05b0ff;
                        text-decoration: underline;
                    }
                }
                .time{
                    flex: 5;
                }
            }
            .body{
                display: block;
                .img,.desc{
                    width: 100%;
                }
            }
        }
    }
</style>