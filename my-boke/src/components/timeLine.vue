<template>
    <div class="timeLine">
        <ul>
            <li v-for="item in timeData" :key="item.id+'timeLine'" class="animated fadeInRightBig">
                <img class="tag" src="~@/assets/images/star.png">
                <div class="time">{{item.ctime}}</div>
                <div class="content" v-html="item.content"></div>
            </li>
        </ul>
    </div>
</template>

<script>
import animate from 'animate.css';
export default {
    props:['timeData']
}
</script>

<style lang="less" scoped>
    .timeLine{
        padding: 5px 0;
        ul{
            margin: 10px 40px;
            border-left: 2px solid #000;
            li{
                padding-left: 50px;
                position: relative;
                margin-bottom: 20px;
                img.tag{
                    position: absolute;
                    left: -19px;
                    top: -5px;
                    font-size: 40px;
                    color: #f2cb51;
                    width: 35px;
                }
                .time{
                    position: relative;
                    padding-top: 5px;
                    left: -30px;
                    color: #fefe55;
                    font-weight: 600;
                    font-size: 16px;
                }
                .content{
                    width: auto;
                    display: inline-block;
                    padding: 10px;
                    margin-top: 20px;
                    margin-left: -10px;
                    background-color: #484348;
                    position: relative;
                    word-break: break-all;
                    &::before{
                        content: '';
                        display: block;
                        position: absolute;
                        left: -20px;
                        top: 5px;
                        border: 10px solid rgba(255,255,255,0);
                        border-top: 6px solid rgba(255,255,255,0);
                        border-bottom: 6px solid rgba(255,255,255,0);
                        border-right-color: #484348;
                    }
                    p{
                        padding: 5px 0;
                    }
                }
            }
        }
    }
    @media screen and (max-width:1024px){
        .timeLine{
            ul{
                li{
                    .content{
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>