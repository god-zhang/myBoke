<template>
    <div class="comments card cardCommon">
        <commentsMain :isReply='false'></commentsMain>
        <commentsMain :isReply='true'></commentsMain>
        <commentsMain :isReply='false'></commentsMain>
        <commentsMain :isReply='true'></commentsMain>
        <commentsMain :isReply='false'></commentsMain>
        <commentsMain :isReply='false'></commentsMain>
        <commentsMain :isReply='true'></commentsMain>
    </div>
</template>

<script>
import commentsMain from '../components/comments-main';
export default {
    components:{
        commentsMain
    }
}
</script>

<style lang="less" scoped>
    
</style>