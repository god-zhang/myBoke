<template>
  <div class="blogCard card">
    <div class="head">
        <div class="title">
            <span>【原创】</span>
            <span>第一篇文章fdfdfgfgfsdfgsdggfsdgfsgd</span>
        </div>
        <div class="time">
            <span :style="{color: randomColor1}">2020</span>&nbsp;-&nbsp;<span :style="{color: randomColor2}">2</span>&nbsp;-&nbsp;<span :style="{color: randomColor3}">1</span>
        </div>
    </div>
    <div class="body">
        <div class="img">
            <img src="~@/assets/images/bg.jpg" alt="">
        </div>
        <div class="desc">这是我发布的第一遍文章,希望大家多多支持aaaaaaaaaaaaaaaaaaa</div>
    </div>
    <div class="hr"></div>
    <div class="foot">
        <div class="tag">
            <img src="~@/assets/images/tag.png" alt="">
            <span>JavaScript</span>
        </div>
        <div class="number">
            <div class="views">
                <img src="~@/assets/images/views.png" alt="">
                <span>45566</span>
            </div>
            <div class="comment">
                <img src="~@/assets/images/comment.png" alt="">
                <span>234</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        
    },
    data() {
        return {
            
        }
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
                }
                .time{
                    display: none;
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