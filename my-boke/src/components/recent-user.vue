<template>
    <div class="users card cardCommon">
        <div class="title cardTitle">最近访客</div>
        <hr color='#999' size='1px' class="cardHr">
        <div class="content">
            <div v-for="item in list" :key="item.id+'users'" class="imgList">
                <img src="~@/assets/images/bg.jpg" alt="">
                <div class="name">{{item.username}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[
                {
                    id: 1,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 2,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 3,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 4,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 5,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 6,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 7,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 8,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 9,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                },
                {
                    id: 10,
                    username: '发顺丰的',
                    headImg: '~@/assets/images/bg.jpg'
                }
            ]
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
                    padding: 5px 0;
                    text-align: center;
                    left: 0;
                    bottom: 0;
                    font-size: 10px;
                }
            }
        }
    }
</style>