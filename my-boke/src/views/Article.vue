<template>
    <div class="articles contentYS">
        <blogArticle></blogArticle>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import blogArticle from '../components/article';
import axios from 'axios';
export default {
    components:{
        blogArticle,
    },
    data() {
        return {
            
        }
    },
    mounted() {
        window.scrollTo(0,0);
        axios.get(`${this.global.apiUrl}queryEmoji`)
        .then((res)=>{
            if(res.status == 200){
                this.getEmojis(res.data);
            }
        })
    },
    methods:{
        ...mapMutations(['getEmojis'])
    }
}
</script>

<style lang="less" scoped>
   
</style>