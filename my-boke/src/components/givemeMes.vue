<template>
    <div class='giveMes card cardCommon'>
        <div class="head">
            <h3>留言屋</h3>
            <p>在此留下你来过的痕迹吧~</p>
        </div>
        <div class="content">
            <div class="emjio">
                <img src="~@/assets/images/emjio.png" alt="添加表情" title="添加表情" @click="showEmoji">
                <img src="~@/assets/images/delete.png" alt="重新输入" title="重新输入" @click="resetMes">
            </div>
            <div class="allEmoji" v-if="isShowEmoji">
                <i :class="'iconfont iconemoji_line'+index" v-for="(item,index) in 65" :key="item+'emoji'" :data-type="'\\emoji^&*iconemoji_line'+index" :data-showtype="'\\emoji'+index" @click="addEmoji"></i>
            </div>
            <textarea name="comments" id="comments" cols="20" rows="10" v-model="giveMes"></textarea>
        </div>
        <button class="upMes" @click='submitMes'>留下足迹</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            giveMes: '',
            isShowEmoji: false
        }
    },
    methods:{
        submitMes(){
            if(this.giveMes == null || this.giveMes == ''){
                alert('输入不能为空')
            }else{
                console.log(this.giveMes);
            }
        },
        resetMes(){
            this.giveMes = '';
        },
        showEmoji(){
            this.isShowEmoji = !this.isShowEmoji;
        },
        addEmoji(e){
            this.giveMes = this.giveMes+e.target.dataset.showtype;
            this.isShowEmoji = false;
        }
    }
}
</script>

<style lang="less" scoped>
    .giveMes{
        width: 100%;
        .head{
            text-align: center;
            h3{
                margin-bottom: 10px;
            }
            p{
                color: #853734;
                font-size: 15px;
            }
        }
        .content{
            position: relative;
            width: 100%;
            margin-top: 40px;
            border: 2px solid #fff;
            border-radius: 10px;
            box-sizing: border-box;
            .emjio{
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #fff;
                margin-bottom: 5px;
                padding: 10px 15px; 
                img{
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
            .allEmoji{
                position: absolute;
                left: 15px;
                top: 40px;
                background-color: #fff;
                width: 455px;
                height: 175px;
                i{
                    width: 35px;
                    height: 35px;
                    color: #000;
                    font-size: 25px;
                    font-weight: 400;
                    display: inline-block;
                    border: 1px solid #000;
                    padding: 2px;
                    text-align: center;
                    box-sizing: border-box;
                }
            }
            textarea{
                padding: 15px;
                width: 100%;
                outline: none;
                background-color: transparent;
                border: none;
                color: #fff;
                font-size: 20px;
                resize: vertical;
                cursor: pointer;
                box-sizing: border-box;
            }
        }
        .upMes{
            margin-top: 10px;
            color: #fff;
            background-color: #6cc40d;
            border: none;
            padding: 10px 20px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            outline: none;
            &:hover{
                background-color: #72d10d;
            }
        }
    }
    @media screen and (max-width:767px){
        .giveMes{
            .content{
                .allEmoji{
                    width: 315px;
                    height: 280px;
                }
            }
        }
    }
</style>