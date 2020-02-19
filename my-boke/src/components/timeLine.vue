<template>
    <div class="timeLine">
        <ul>
            <li v-for="item in timeData" :key="item.id+'timeLine'">
                <i class="iconfont iconxingxing"></i>
                <div class="time">{{item.time}}</div>
                <div class="content">
                    <img :src="item.img" alt="" v-if="item.img">
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
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
                width: fit-content;
                padding-left: 50px;
                position: relative;
                margin-bottom: 20px;
                i{
                    position: absolute;
                    left: -20px;
                    top: -5px;
                    font-size: 40px;
                    color: #f2cb51;
                }
                .time{
                    position: relative;
                    padding-top: 5px;
                    left: -30px;
                    color: #fff;
                    font-size: 15px;
                }
                .content{
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