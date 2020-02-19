<template>
    <div class="cate card">
        <div class="search">
            <input type="text" placeholder="你懂得~">
            <div class="searchBtn">
                <img src="~@/assets/images/search.png" alt="">
            </div>
        </div>
        <div class="tag">
            <ul @mouseover="randomColor($event)" @mouseout="cancelColor($event)">
                <li>JavaScript</li>
                <li>NodeJs</li>
                <li>CSS</li>
                <li>HTML</li>
                <li>Vue</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    computed:{

    },

    methods:{
        randomColor(that){
            const zimu = ['a','b','c','d','e','f',1,2,3,4,5,6,7,8,9,0];
            let str = '';
            for (let i = 0; i < 6; i++) {
                const randomZ = zimu[parseInt(Math.random()*zimu.length)];
                str+=randomZ;
            }
            that.target.style.color = '#'+str;
        },
        cancelColor(that){
            that.target.style.color = '#fff';
        }
    }
}
</script>

<style lang="less" scoped>
    .cate{
        .search{
            width: 100%;
            padding: 15px 10px;
            box-sizing: border-box;
            text-align: center;
            background-color: #000;
            position: relative;
            input{
                width: 80%;
                height: 20px;
                border-radius: 20px;
                border: none;
                outline: none;
                padding: 5px 15px;
                background-color: #fff;
            }
            .searchBtn{
                position: absolute;
                right: 10%;
                top: 15px;
            }
        }
        .tag{
            ul{
                li{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, .1);
                    box-sizing: border-box;
                    cursor: pointer;
                    &:hover{
                        background-color: rgba(255,255,255,0.1);
                        border-right: 5px solid #eee;
                    }
                }
            }
        }
    }
</style>