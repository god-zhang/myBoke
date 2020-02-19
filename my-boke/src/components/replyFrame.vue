<template>
    <div class="replyBorder" v-if='showReply'>
        <textarea name="replyB" id="replyB" cols="30" rows="1" placeholder="回复****" v-model="replyVal"></textarea>
        <button class="submitReply" @click="biuReply">biu ~</button>
    </div>
</template>

<script>
export default {
    props:['showReply'],
    data() {
        return {
            replyVal: ''
        }
    },
    methods:{
        biuReply(){
            if(this.replyVal.replace(/[ ]/g,'') == ''){
                alert('不能为空')
            }else{
                console.log(this.replyVal);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .replyBorder{
        width: 100%;
        margin-top: 10px;
        textarea{
            width: 100%;
            resize: vertical;
            outline: none;
            border: 1px solid #fff;
            background-color: transparent;
            padding: 15px;
            border-radius: 10px;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            &::placeholder{
                color: rgb(66, 66, 66);
            }
        }
        .submitReply{
            margin-top: 10px;
            color: #fff;
            background-color: #6cc40d;
            border: none;
            padding: 5px 10px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            outline: none;
            &:hover{
                background-color: #72d10d;
            }
        }
    }
</style>